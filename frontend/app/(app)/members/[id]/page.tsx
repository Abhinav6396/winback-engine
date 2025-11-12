"use client";

import { useQuery } from "@tanstack/react-query";
import { getMember } from "@/lib/mock-api";
import { HealthScoreCard } from "@/components/cards/HealthScoreCard";
import { formatDistanceToNow } from "date-fns";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Member } from "@/lib/types";
import { ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon } from "lucide-react";

export default function MemberDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: memberData, isLoading } = useQuery({
    queryKey: ['member', id],
    queryFn: () => getMember(id as string)
  });

  // Type assertion to handle the API response
  const member = memberData?.data ? {
    ...memberData.data,
    // Ensure we have a health score, defaulting to 0 if not present
    health_score: (memberData.data as any).health_score ?? (memberData.data as any).healthScore ?? 0,
    // Ensure we have a status, defaulting to 'healthy' if not present
    status: memberData.data.status || 'healthy'
  } : null;

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!member) return <div className="p-6">Member not found</div>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <button 
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800 flex items-center mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Members
        </button>
        
        <div className="flex justify-between items-start">
          <div className="mt-4">
            <h1 className="text-2xl font-bold">{member.name}</h1>
            <p className="text-gray-600 mt-1">{member.email}</p>
          </div>
          <div className="flex">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
              Edit
            </button>
            <div className="w-6"></div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Send Message
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Member Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Active
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium">
                  {member.joined_at ? new Date(member.joined_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Active</p>
                <p className="font-medium">
                  {member.last_active ? new Date(member.last_active).toLocaleString() : 'Never'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Plan</p>
                <p className="font-medium">{member.plan || 'Free'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Activity</h2>
            <div className="space-y-4">
              {member.activity?.map((activity: any, index: number) => (
                <div key={index} className="flex items-start">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500">No recent activity</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <HealthScoreCard 
            score={member.health_score} 
            tier={member.status}
            reasons={[]}
          />
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Health Score Breakdown</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Overall Health Score</span>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-2">{member.health_score || 0}%</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      (member.health_score || 0) >= 70 ? 'bg-green-100 text-green-800' :
                      (member.health_score || 0) >= 40 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {member.status || 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      (member.health_score || 0) >= 70 ? 'bg-green-500' :
                      (member.health_score || 0) >= 40 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${member.health_score || 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <h3 className="font-medium">Key Factors</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Active Usage', value: 75, change: 5 },
                    { label: 'Engagement', value: 60, change: -2 },
                    { label: 'Support Tickets', value: 45, change: -8 },
                    { label: 'Feature Usage', value: 85, change: 3 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium w-10 text-right mr-2">{item.value}%</span>
                        <div className={`flex items-center text-xs ${
                          item.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.change >= 0 ? (
                            <ArrowUpIcon className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDownIcon className="w-3 h-3 mr-1" />
                          )}
                          {Math.abs(item.change)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 rounded-md">
                Send Survey
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 rounded-md">
                View All Activity
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

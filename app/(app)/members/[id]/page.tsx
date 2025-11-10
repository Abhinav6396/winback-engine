"use client";

import { useQuery } from "@tanstack/react-query";
import { getMember } from "@/lib/mock-api";
import { HealthScoreCard } from "@/components/cards/HealthScoreCard";
import { useParams, useRouter } from "next/navigation";

export default function MemberDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: member, isLoading } = useQuery({
    queryKey: ['member', id],
    queryFn: () => getMember(id as string)
  });

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
          <div>
            <h1 className="text-2xl font-bold">{member.name}</h1>
            <p className="text-gray-600">{member.email}</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
              Edit
            </button>
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

"use client";

import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/lib/mock-api";

function LoadingSkeleton() {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MembersPage() {
  const { data: members, isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: getMembers
  });

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Members</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Add Member
            </button>
            <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
              Import
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search members..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        <div className="divide-y">
          {members?.map((member) => (
            <div key={member.id} className="p-4 hover:bg-gray-50 flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <span className="text-gray-600 font-medium">
                  {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="font-medium">{member.name}</div>
                <div className="text-sm text-gray-500">{member.email}</div>
              </div>
              <div className="text-sm text-gray-500">
                {member.last_seen || 'Never'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

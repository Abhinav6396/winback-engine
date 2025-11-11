"use client";

import { useQuery } from "@tanstack/react-query";
import { Search, ChevronDown, LogOut, HelpCircle, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { getDashboard, membersApi } from "@/lib/api";
import { Member } from "@/lib/types";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer,
  LineChart, Line, Tooltip
} from "recharts";
import Link from "next/link";

export default function DashboardPage() {
  // All hooks must be called at the top level, before any conditional returns
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Move useEffect before any conditional returns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Data fetching hooks
  const { data: dashboard, isLoading: loadingDashboard } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard
  });
  
  const { data: membersResponse, isLoading: loadingMembers } = useQuery({
    queryKey: ['members'],
    queryFn: membersApi.getMembers
  });

  // Loading and error states
  if (loadingDashboard || loadingMembers) return <div className="p-8">Loading...</div>;
  if (!dashboard) return <div className="p-8">Unable to load dashboard data</div>;

  // Data processing after we know we have data
  const { metrics, distribution, churnTrend } = dashboard;
  const members = membersResponse?.data || [];
  const atRiskMembers = members.filter((m: Member) => m.status && m.status.toLowerCase() !== "healthy").slice(0, 5);

  const userInitials = 'AK'; // Replace with actual user initials

  return (
    <div className="space-y-6">
      {/* Header with Search and User Menu */}
      <div className="flex items-center justify-between gap-4">
        {/* Welcome Message */}
        <div>
          <h1 className="text-2xl font-semibold">Welcome back 👋</h1>
          <p className="text-gray-500 text-sm">Here's how your members are doing this month.</p>
        </div>

        {/* Search and User Menu Container */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="w-64">
            <div className="flex items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-yellow-400 focus-within:border-yellow-400 transition-all">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-1.5 outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-gray-800 font-medium text-sm">
                {userInitials}
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-10 overflow-hidden">
                <div className="p-2">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Abhinav Kumar</p>
                    <p className="text-xs text-gray-500 truncate">abhinav@example.com</p>
                  </div>
                  <div className="py-1">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-1"
                    >
                      <User className="w-4 h-4 mr-3 text-gray-500" />
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-1"
                    >
                      <HelpCircle className="w-4 h-4 mr-3 text-gray-500" />
                      Help & Support
                    </a>
                  </div>
                  <div className="py-1 border-t border-gray-100">
                    <button
                      onClick={() => {
                        // Handle logout logic here
                        console.log('Logout clicked');
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-left text-red-600 hover:bg-red-50 rounded-lg mx-1"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOP METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="Churn Rate" value={`${(metrics.churnRate * 100).toFixed(1)}%`} />
        <MetricCard label="At-Risk Members" value={metrics.atRiskCount} />
        <MetricCard label="Avg Health Score" value={metrics.avgHealthScore} />
        <MetricCard label="Revenue Saved" value={`$${metrics.revenueSaved.toLocaleString()}`} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Health Breakdown */}
        <Card title="Member Health Breakdown">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={[
              { name: "Healthy", value: distribution.healthy },
              { name: "At Risk", value: distribution.at_risk },
              { name: "Critical", value: distribution.critical },
            ]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Churn Trend */}
        <Card title="Churn Trend">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={churnTrend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="churnPct" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

      </div>

      {/* At Risk Table */}
      <Card title="At-Risk Members Who Need Attention">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="text-left py-2">Name</th>
              <th>Health</th>
              <th>LTV</th>
              <th>Last Login</th>
              <th>Next Renewal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {atRiskMembers.map((member: Member) => (
              <tr key={member.id} className="border-b">
                <td className="py-2">{member.name}</td>
                <td className="text-center">{member.health_score}</td>
                <td className="text-center">${member.lifetime_value}</td>
                <td className="text-center">{member.last_login_at || "-"}</td>
                <td className="text-center">{member.next_renewal_date || "-"}</td>
                <td>
                  <Link href={`/members/${member.id}`} className="text-blue-600 hover:underline">
                    Message
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <Link href="/members" className="text-blue-600 hover:underline">View all members</Link>
          <Link href="/campaigns" className="text-blue-600 hover:underline">Run win-back campaign →</Link>
        </div>
      </Card>
    </div>
  );
}

// Reusable UI helpers

interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="p-5 bg-white border rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
}

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="p-5 bg-white border rounded-xl shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold mt-2">{value}</div>
    </div>
  );
}

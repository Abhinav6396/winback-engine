'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowUp, ArrowDown, Users, Activity, TrendingUp, Clock, PlusCircle, Mail, BarChart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getDashboard } from "@/lib/api";
import { useQuery } from '@tanstack/react-query';

interface DashboardData {
  metrics: {
    churnRate: number;
    atRiskCount: number;
    avgHealthScore: number;
    revenueSaved: number;
  };
  churnTrend: Array<{
    month: string;
    churnPct: number;
  }>;
  distribution: {
    healthy: number;
    at_risk: number;
    critical: number;
  };
}

export default function DashboardPage() {
  const { data: dashboardData, isLoading, error } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error loading dashboard data. Please try again later.</div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">No dashboard data available.</div>
      </div>
    );
  }

  const metrics = [
    {
      title: "Total Campaigns",
      value: "0",
      description: "Active campaigns",
      icon: "📊",
      change: "",
      isPositive: true,
    },
    {
      title: "Engagement",
      value: "0%",
      description: "Average engagement rate",
      icon: "💬",
      change: "",
      isPositive: true,
    },
    {
      title: "Leads",
      value: "0",
      description: "New leads this month",
      icon: "📈",
      change: "",
      isPositive: true,
    },
    {
      title: "Tasks",
      value: "0",
      description: "Pending tasks",
      icon: "✅",
      change: "",
      isPositive: true,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      action: "updated profile",
      time: "2 minutes ago",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      action: "completed onboarding",
      time: "1 hour ago",
      avatar: "JS",
    },
    {
      id: 3,
      name: "Alex Johnson",
      email: "alex@example.com",
      action: "upgraded to Pro",
      time: "3 hours ago",
      avatar: "AJ",
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hi User!</h1>
          <p className="text-muted-foreground">Welcome to your dashboard. This is where you'll find all your important metrics and quick actions.</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search members..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <Button>New Member</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <span className="text-2xl">{metric.icon}</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions from your team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{activity.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">{activity.name}</h3>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {activity.action}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Button variant="outline" className="w-full justify-start">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Member
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email Campaign
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart className="mr-2 h-4 w-4" />
                    View Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

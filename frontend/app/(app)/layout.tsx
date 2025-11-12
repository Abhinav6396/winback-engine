'use client';import Link from "next/link";
import { usePathname } from "next/navigation";

// ICONS
import { LayoutDashboard, Users, Megaphone, MessageSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/members", label: "Members", icon: Users },
    { href: "/campaigns", label: "Campaigns", icon: Megaphone },
    { href: "/exit-surveys", label: "Exit Surveys", icon: MessageSquare },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="font-bold text-2xl mb-8 text-gray-800">Winback Engine</div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  isActive 
                    ? 'bg-yellow-400/90 text-black shadow-sm hover:bg-yellow-400' 
                    : 'bg-gray-50 text-gray-600 hover:bg-yellow-50 hover:text-gray-900 hover:shadow-sm'
                )}
              >
                <Icon className={cn(
                  'w-5 h-5 transition-colors',
                  isActive ? 'text-black' : 'text-gray-500 group-hover:text-current',
                  {
                    'text-blue-500': item.href === '/dashboard',
                    'text-green-500': item.href === '/members',
                    'text-purple-500': item.href === '/campaigns',
                    'text-pink-500': item.href === '/exit-surveys',
                    'text-gray-600': item.href === '/settings',
                  }
                )} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 text-xs text-gray-400">
          Made for creators 💛
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}



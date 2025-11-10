'use client';import Link from "next/link";
import { usePathname } from "next/navigation";

// ICONS
import { LayoutDashboard, Users, Megaphone, MessageSquare, Settings } from "lucide-react";

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
      <aside className="w-64 bg-white border-r p-6 flex flex-col">
        <div className="font-bold text-2xl mb-8 text-gray-800">Winback Engine</div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all
                  ${isActive ? "bg-yellow-400 text-black shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-yellow-200 hover:text-black"}
                `}
              >
                <Icon className="w-4 h-4" />
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



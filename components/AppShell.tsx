'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, User, Settings, Zap } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Explore', href: '/explore', icon: Compass },
    { label: "Mijn echo's", href: '/my-echos', icon: User },
    { label: 'Instellingen', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 hidden md:flex flex-col fixed h-full bg-slate-950/50 backdrop-blur">
        <div className="flex items-center space-x-2 text-purple-500 px-6 py-6">
          <Zap className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight text-white">
            EchoMatch
          </span>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition
                  ${
                    isActive
                      ? 'bg-purple-500/10 text-purple-400'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Middenkolom */}
      <main className="flex-1 px-8 py-10 md:ml-64">
        {children}
      </main>
    </div>
  );
}

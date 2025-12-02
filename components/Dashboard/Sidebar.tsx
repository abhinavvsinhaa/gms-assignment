'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  DollarSign, 
  Receipt, 
  Shield, 
  Users 
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Product', icon: Package, href: '/dashboard/products' },
  { name: 'Finance', icon: DollarSign, href: '/dashboard/finance' },
  { name: 'Listing Fee', icon: Receipt, href: '/dashboard/listing-fee' },
  { name: 'Compliance', icon: Shield, href: '/dashboard/compliance' },
  { name: 'Roles & Permission', icon: Users, href: '/dashboard/roles' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[200px] h-screen bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link href="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          GMS
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-purple-50 text-purple-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-purple-700' : 'text-gray-500'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}


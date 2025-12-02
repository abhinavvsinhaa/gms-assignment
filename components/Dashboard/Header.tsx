'use client';

import { useState } from 'react';
import { ChevronDown, Bell } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function Header({ title, breadcrumbs }: HeaderProps) {
  const [isVendorOpen, setIsVendorOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="h-16 bg-white border-b border-gray-200 fixed top-0 left-[200px] right-0 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left side - Title or Breadcrumbs */}
        <div>
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <div className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {crumb.href ? (
                    <a href={crumb.href} className="text-gray-600 hover:text-gray-900">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-gray-400">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-gray-400">/</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          )}
        </div>

        {/* Right side - Actions and User */}
        <div className="flex items-center gap-6">
          {/* Vendor Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsVendorOpen(!isVendorOpen)}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
            >
              Vendor
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Links */}
          <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
            Learn more
          </a>
          <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
            Documentation
          </a>
          <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
            Support
          </a>

          {/* Notification Bell */}
          <button className="relative p-1 text-gray-500 hover:text-gray-700">
            <Bell className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


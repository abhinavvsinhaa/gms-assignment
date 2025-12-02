'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import { Search, Filter, Upload, Plus, RefreshCw, MoreVertical, TrendingUp, TrendingDown, Info } from 'lucide-react';
import Link from 'next/link';

const staticProducts = [
  {
    name: 'Lunacel',
    status: { label: 'Approved', type: 'approved' },
    revenue: '$ 67,234',
    orders: '34',
    compliance: [
      { name: 'GDPR', days: '5d' },
      { name: 'SOC2', status: 'Expired' },
    ],
    listingFees: { amount: '$5000/$10000', timeLeft: '2months left' },
    marketingSpends: '$ 1,230',
    revenueChange: { value: 40, direction: 'up' },
  },
  {
    name: 'Mobbin',
    status: { label: 'Pending', type: 'pending' },
    revenue: '$ 67,234',
    orders: '34',
    compliance: [{ name: 'SOC2', status: 'Expired' }],
    listingFees: { amount: '$5000/$10000', timeLeft: '12days left' },
    marketingSpends: '$ 1,230',
    revenueChange: { value: 40, direction: 'down' },
  },
  {
    name: 'Zapier',
    status: { label: 'Rejected', type: 'rejected' },
    revenue: '$ 67,234',
    orders: '34',
    compliance: [{ name: 'SOC2', status: 'Expired' }],
    listingFees: { amount: '$5000/$10000', timeLeft: '12days left' },
    marketingSpends: '$ 1,230',
    revenueChange: { value: 40, direction: 'down' },
  },
  {
    name: 'Bolt',
    status: { label: 'Expired', type: 'expired' },
    revenue: '$ 67,234',
    orders: '34',
    compliance: [{ name: 'SOC2', status: 'Expired' }],
    listingFees: { amount: '$5000/$10000', timeLeft: '12days left' },
    marketingSpends: '$ 1,230',
    revenueChange: { value: 40, direction: 'down' },
  },
];

const getStatusStyle = (type: string) => {
  const styles = {
    draft: 'bg-gray-100 text-gray-700',
    approved: 'bg-green-50 text-green-700',
    pending: 'bg-orange-50 text-orange-700',
    rejected: 'bg-red-50 text-red-700',
    expired: 'bg-red-50 text-red-700',
  };
  return styles[type as keyof typeof styles] || styles.draft;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  // Load products (draft + static)
  useEffect(() => {
    const loadProducts = () => {
      const draftProducts = JSON.parse(localStorage.getItem('draftProducts') || '[]');
      setProducts([...draftProducts, ...staticProducts]);
    };
    
    loadProducts();
    
    // Refresh products when window gains focus (user comes back to the tab)
    const handleFocus = () => loadProducts();
    window.addEventListener('focus', handleFocus);
    
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <DashboardLayout title="Products">
      <div className="space-y-6">
        {/* Search and Actions Bar */}
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              Export
            </button>
            <Link
              href="/dashboard/products/new"
              className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" />
              New product
            </Link>
            <button className="p-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Status
                    <Info className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Orders
                    <Info className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Compliance
                    <Info className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Listing Fees
                    <Info className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Marketing Spends
                    <Info className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Revenue
                  </div>
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.status.type === 'draft' ? (
                      <Link href="/dashboard/products/new" className="flex items-center gap-3 hover:text-indigo-600">
                        <span className="text-sm font-medium text-gray-900">{product.name}</span>
                        {product.status.badge && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-purple-700 bg-purple-50 rounded">
                            <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                            {product.status.badge}
                          </span>
                        )}
                      </Link>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900">{product.name}</span>
                        {product.status.badge && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-purple-700 bg-purple-50 rounded">
                            <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                            {product.status.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${getStatusStyle(product.status.type)}`}>
                      {product.status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {product.compliance.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <span className="text-gray-900">{item.name}</span>
                          {item.days && (
                            <span className="text-orange-600">{item.days}</span>
                          )}
                          {item.status && (
                            <span className="text-red-600">{item.status}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.listingFees !== '-' && (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-sm text-gray-900">
                          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M2 6h12" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                          {product.listingFees.amount}
                        </div>
                        <span className="text-xs text-gray-500">{product.listingFees.timeLeft}</span>
                      </div>
                    )}
                    {product.listingFees === '-' && <span className="text-sm text-gray-900">-</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.marketingSpends}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.revenueChange ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-8">
                          {product.revenueChange.direction === 'up' ? (
                            <svg className="w-full h-full" viewBox="0 0 64 32" fill="none">
                              <path d="M0 28 Q16 12 32 16 T64 4" stroke="#10b981" strokeWidth="2" fill="none" />
                            </svg>
                          ) : (
                            <svg className="w-full h-full" viewBox="0 0 64 32" fill="none">
                              <path d="M0 4 Q16 20 32 16 T64 28" stroke="#ef4444" strokeWidth="2" fill="none" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm font-medium ${product.revenueChange.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {product.revenueChange.direction === 'up' ? '↑' : '↓'} {product.revenueChange.value}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-900">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}


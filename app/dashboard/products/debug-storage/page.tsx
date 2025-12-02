'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';

export default function DebugStoragePage() {
  const [storageData, setStorageData] = useState<any>({});

  useEffect(() => {
    const productFormData = localStorage.getItem('productFormData');
    const productFormStep = localStorage.getItem('productFormStep');
    const draftProducts = localStorage.getItem('draftProducts');

    setStorageData({
      productFormData: productFormData ? JSON.parse(productFormData) : null,
      productFormStep: productFormStep,
      draftProducts: draftProducts ? JSON.parse(draftProducts) : null,
    });
  }, []);

  const clearStorage = () => {
    localStorage.removeItem('productFormData');
    localStorage.removeItem('productFormStep');
    localStorage.removeItem('draftProducts');
    alert('Storage cleared! Refresh the page.');
    window.location.reload();
  };

  return (
    <DashboardLayout title="Debug Storage">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">LocalStorage Contents</h2>
          <button
            onClick={clearStorage}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Clear All Storage
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-3">Product Form Data</h3>
          <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(storageData.productFormData, null, 2)}
          </pre>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-3">Current Step</h3>
          <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto">
            {storageData.productFormStep}
          </pre>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-3">Draft Products</h3>
          <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(storageData.draftProducts, null, 2)}
          </pre>
        </div>
      </div>
    </DashboardLayout>
  );
}


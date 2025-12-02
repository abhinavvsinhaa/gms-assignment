'use client';

import { useState } from 'react';
import { Plus, Trash2, Info, X } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  badge: string;
  features: string[];
}

interface PlansAndPricingProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

type PricingModel = 'subscription' | 'usage-based' | 'license' | 'contact-us';
type BillingCycle = 'monthly' | 'annual';

const pricingTabs = [
  { id: 'subscription' as PricingModel, label: 'Subscription' },
  { id: 'usage-based' as PricingModel, label: 'Usage-Based' },
  { id: 'license' as PricingModel, label: 'License' },
  { id: 'contact-us' as PricingModel, label: 'Contact Us' },
];

const badgeOptions = [
  'Most Popular',
  'Best Value',
  'Recommended',
  'Enterprise',
  'Starter',
  'Professional',
];

export default function PlansAndPricing({ formData, updateFormData, onNext, onBack }: PlansAndPricingProps) {
  const [activeTab, setActiveTab] = useState<PricingModel>(formData.pricingModel || 'subscription');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(formData.billingCycle || 'monthly');
  const [activeTier, setActiveTier] = useState<string>('tier-1');
  const [plans, setPlans] = useState<Plan[]>(formData.plans || []);
  const [currentPlan, setCurrentPlan] = useState<Plan>({
    id: '',
    name: '',
    monthlyPrice: '',
    yearlyPrice: '',
    badge: '',
    features: [],
  });
  const [featureInput, setFeatureInput] = useState('');

  // Update form data when pricing model changes
  const handleTabChange = (tab: PricingModel) => {
    setActiveTab(tab);
    updateFormData('pricingModel', tab);
  };

  // Update billing cycle
  const handleBillingCycleChange = (cycle: BillingCycle) => {
    setBillingCycle(cycle);
    updateFormData('billingCycle', cycle);
  };

  // Add feature to current plan
  const addFeature = () => {
    if (featureInput.trim()) {
      setCurrentPlan({
        ...currentPlan,
        features: [...currentPlan.features, featureInput.trim()],
      });
      setFeatureInput('');
    }
  };

  // Remove feature from current plan
  const removeFeature = (index: number) => {
    setCurrentPlan({
      ...currentPlan,
      features: currentPlan.features.filter((_, i) => i !== index),
    });
  };

  // Save current plan
  const savePlan = () => {
    if (!currentPlan.name || !currentPlan.monthlyPrice || !currentPlan.yearlyPrice) {
      alert('Please fill in plan name, monthly price, and yearly price');
      return;
    }

    const planWithId = {
      ...currentPlan,
      id: currentPlan.id || Date.now().toString(),
    };

    const existingIndex = plans.findIndex(p => p.id === planWithId.id);
    let updatedPlans;

    if (existingIndex >= 0) {
      updatedPlans = plans.map((p, i) => i === existingIndex ? planWithId : p);
    } else {
      updatedPlans = [...plans, planWithId];
    }

    setPlans(updatedPlans);
    updateFormData('plans', updatedPlans);
    
    // Reset current plan
    setCurrentPlan({
      id: '',
      name: '',
      monthlyPrice: '',
      yearlyPrice: '',
      badge: '',
      features: [],
    });
    
    alert('Plan saved successfully!');
  };

  // Delete a plan
  const deletePlan = (planId: string) => {
    if (confirm('Are you sure you want to delete this plan?')) {
      const updatedPlans = plans.filter(p => p.id !== planId);
      setPlans(updatedPlans);
      updateFormData('plans', updatedPlans);
    }
  };

  // Edit a plan
  const editPlan = (plan: Plan) => {
    setCurrentPlan(plan);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Plan</h2>
        <p className="text-sm text-gray-600 mb-6">
          Add the plans you want to sell for this product. You can offer multiple pricing options to give customers more choice
        </p>
      </div>

      {/* Pricing Model Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          {pricingTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subscription Tab Content */}
      {activeTab === 'subscription' && (
        <div className="space-y-6">
          {/* Billing Cycle */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              Billing Cycle <span className="text-red-500">*</span>
              <Info className="w-4 h-4 text-gray-400" />
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={billingCycle === 'monthly'}
                  onChange={() => handleBillingCycleChange('monthly')}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Monthly</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={billingCycle === 'annual'}
                  onChange={() => handleBillingCycleChange('annual')}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Annual</span>
              </label>
            </div>
          </div>

          {/* Tier Selection */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTier('tier-1')}
              className={`flex-1 px-4 py-3 text-sm font-medium border rounded-lg transition-colors ${
                activeTier === 'tier-1'
                  ? 'bg-gray-50 border-gray-300 text-gray-900'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Tier1
            </button>
            <button
              onClick={() => {
                setActiveTier('new');
                setCurrentPlan({
                  id: '',
                  name: '',
                  monthlyPrice: '',
                  yearlyPrice: '',
                  badge: '',
                  features: [],
                });
              }}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
              Add Tier
            </button>
          </div>

          {/* Plan Details Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
            <h3 className="text-base font-semibold text-gray-900">
              {currentPlan.id ? 'Edit Plan' : 'New Plan'}
            </h3>

            {/* Plan Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                Plan Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={currentPlan.name}
                onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
                placeholder="Enter plan name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-4">
              {/* Monthly Price */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="text"
                    value={currentPlan.monthlyPrice}
                    onChange={(e) => setCurrentPlan({ ...currentPlan, monthlyPrice: e.target.value })}
                    placeholder="Enter monthly price"
                    className="w-full pl-7 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">/mo</span>
                </div>
              </div>

              {/* Yearly Price */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  Yearly price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="text"
                    value={currentPlan.yearlyPrice}
                    onChange={(e) => setCurrentPlan({ ...currentPlan, yearlyPrice: e.target.value })}
                    placeholder="Enter yearly price"
                    className="w-full pl-7 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">/Yr</span>
                </div>
              </div>
            </div>

            {/* Badge */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                Badge
                <Info className="w-4 h-4 text-gray-400" />
              </label>
              <select
                value={currentPlan.badge}
                onChange={(e) => setCurrentPlan({ ...currentPlan, badge: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Select badge</option>
                {badgeOptions.map((badge) => (
                  <option key={badge} value={badge}>
                    {badge}
                  </option>
                ))}
              </select>
            </div>

            {/* Features */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                Features <span className="text-red-500">*</span>
              </label>
              
              {/* Feature Input */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  placeholder="Feature 1"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={addFeature}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {/* Features List */}
              {currentPlan.features.length > 0 && (
                <div className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-900">{feature}</span>
                      <button
                        onClick={() => removeFeature(index)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Feature Button */}
              <button
                onClick={() => {
                  const newFeature = `Feature ${currentPlan.features.length + 1}`;
                  setCurrentPlan({
                    ...currentPlan,
                    features: [...currentPlan.features, newFeature],
                  });
                }}
                className="mt-3 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </button>
            </div>

            {/* Delete Plan */}
            {currentPlan.id && (
              <button
                onClick={() => deletePlan(currentPlan.id)}
                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Delete plan
              </button>
            )}

            {/* Save Plan Button */}
            <button
              onClick={savePlan}
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Save plan
            </button>
          </div>

          {/* Saved Plans List */}
          {plans.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Saved Plans</h3>
              <div className="grid gap-4">
                {plans.map((plan) => (
                  <div key={plan.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                          {plan.badge && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          ${plan.monthlyPrice}/mo • ${plan.yearlyPrice}/yr
                        </p>
                        <p className="text-xs text-gray-500">
                          {plan.features.length} feature(s)
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editPlan(plan)}
                          className="px-3 py-1.5 text-xs font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePlan(plan.id)}
                          className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Other Tabs Content */}
      {activeTab === 'usage-based' && (
        <div className="text-center py-12">
          <p className="text-gray-600">Usage-Based pricing will be implemented later</p>
        </div>
      )}

      {activeTab === 'license' && (
        <div className="text-center py-12">
          <p className="text-gray-600">License pricing will be implemented later</p>
        </div>
      )}

      {activeTab === 'contact-us' && (
        <div className="text-center py-12">
          <p className="text-gray-600">Contact Us option will be implemented later</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}


'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import BasicDetails from '@/components/ProductForm/BasicDetails';
import Features from '@/components/ProductForm/Features';
import PlansAndPricing from '@/components/ProductForm/PlansAndPricing';

interface Feature {
  id: string;
  title: string;
  description: string;
}

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
}

interface Plan {
  id: string;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  badge: string;
  features: string[];
}

interface FormData {
  // Basic Details
  pdfFile: File | null;
  productName: string;
  tagline: string;
  category: string;
  subCategory: string;
  productTags: string[];
  
  // Features
  productLogo: File | null;
  features: Feature[];
  mediaFiles: MediaFile[];
  documentationLinks: string[];
  integrations: string[];
  
  // Plans & Pricing
  pricingModel: 'subscription' | 'usage-based' | 'license' | 'contact-us';
  billingCycle: 'monthly' | 'annual';
  plans: Plan[];
}

const steps = [
  { id: 1, name: 'Basic details' },
  { id: 2, name: 'Features' },
  { id: 3, name: 'Plans & Pricing' },
  { id: 4, name: 'Compliance' },
  { id: 5, name: 'Preview' },
  { id: 6, name: 'Payment' },
];

const getInitialFormData = (): FormData => {
  if (typeof window === 'undefined') {
    return {
      pdfFile: null,
      productName: '',
      tagline: '',
      category: '',
      subCategory: '',
      productTags: [],
      productLogo: null,
      features: [],
      mediaFiles: [],
      documentationLinks: [],
      integrations: [],
      pricingModel: 'subscription',
      billingCycle: 'monthly',
      plans: [],
    };
  }

  const savedData = localStorage.getItem('productFormData');
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      console.log('🔵 Initial load from localStorage:', parsed);
      return {
        pdfFile: null,
        productName: parsed.productName || '',
        tagline: parsed.tagline || '',
        category: parsed.category || '',
        subCategory: parsed.subCategory || '',
        productTags: parsed.productTags || [],
        productLogo: null,
        features: parsed.features || [],
        mediaFiles: [],
        documentationLinks: parsed.documentationLinks || [],
        integrations: parsed.integrations || [],
        pricingModel: parsed.pricingModel || 'subscription',
        billingCycle: parsed.billingCycle || 'monthly',
        plans: parsed.plans || [],
      };
    } catch (error) {
      console.error('❌ Error loading saved form data:', error);
    }
  }

  return {
    pdfFile: null,
    productName: '',
    tagline: '',
    category: '',
    subCategory: '',
    productTags: [],
    productLogo: null,
    features: [],
    mediaFiles: [],
    documentationLinks: [],
    integrations: [],
    pricingModel: 'subscription',
    billingCycle: 'monthly',
    plans: [],
  };
};

const getInitialStep = (): number => {
  if (typeof window === 'undefined') return 1;
  const savedStep = localStorage.getItem('productFormStep');
  if (savedStep) {
    console.log('🔵 Initial step from localStorage:', savedStep);
    return parseInt(savedStep);
  }
  return 1;
};

export default function NewProductPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(getInitialStep);
  const [formData, setFormData] = useState<FormData>(getInitialFormData);
  const [maxCompletedStep, setMaxCompletedStep] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem('maxCompletedStep');
    return saved ? parseInt(saved) : 0;
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false); // Track if opened via Preview button

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = {
      productName: formData.productName,
      tagline: formData.tagline,
      category: formData.category,
      subCategory: formData.subCategory,
      productTags: formData.productTags,
      features: formData.features,
      documentationLinks: formData.documentationLinks,
      integrations: formData.integrations,
      pricingModel: formData.pricingModel,
      billingCycle: formData.billingCycle,
      plans: formData.plans,
    };
    
    // Only save if there's actual data
    if (formData.productName) {
      console.log('💾 Saving form data:', dataToSave);
      localStorage.setItem('productFormData', JSON.stringify(dataToSave));
      
      // Update draft products list
      const draftProducts = JSON.parse(localStorage.getItem('draftProducts') || '[]');
      const existingIndex = draftProducts.findIndex((p: any) => p.id === 'current-draft');
      
      // Use maxCompletedStep for display instead of currentStep
      const displayStep = Math.max(maxCompletedStep, 1);
      
      const draftProduct = {
        id: 'current-draft',
        name: formData.productName,
        status: { label: 'Draft', type: 'draft', badge: `Step ${displayStep} of ${steps.length}` },
        revenue: '-',
        orders: '-',
        compliance: [],
        listingFees: '-',
        marketingSpends: '-',
        revenueChange: null,
        lastModified: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        draftProducts[existingIndex] = draftProduct;
      } else {
        draftProducts.push(draftProduct);
      }

      localStorage.setItem('draftProducts', JSON.stringify(draftProducts));
      console.log('💾 Updated draft products list');
    }
  }, [formData, maxCompletedStep]);

  // Save current step
  useEffect(() => {
    if (formData.productName) {
      console.log('💾 Saving current step:', currentStep);
      localStorage.setItem('productFormStep', currentStep.toString());
    }
  }, [currentStep, formData.productName]);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!formData.productName || !formData.tagline || !formData.category || !formData.subCategory || formData.productTags.length === 0) {
        alert('Please fill in all required fields');
        return;
      }
    } else if (currentStep === 2) {
      if (formData.features.length === 0 || formData.features.some((f: Feature) => !f.title || !f.description)) {
        alert('Please add at least one feature with title and description');
        return;
      }
      if (formData.documentationLinks.length === 0) {
        alert('Please add at least one documentation link');
        return;
      }
      if (formData.integrations.length === 0) {
        alert('Please add at least one supported integration');
        return;
      }
    } else if (currentStep === 3) {
      if (formData.pricingModel === 'subscription' && formData.plans.length === 0) {
        alert('Please add at least one pricing plan');
        return;
      }
    }
    
    // Update max completed step
    if (currentStep > maxCompletedStep) {
      const newMax = currentStep;
      setMaxCompletedStep(newMax);
      localStorage.setItem('maxCompletedStep', newMax.toString());
    }
    
    if (currentStep < steps.length) {
      setIsPreviewMode(false); // Clear preview mode when navigating normally
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setIsPreviewMode(false); // Clear preview mode when navigating back
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePreview = () => {
    // Show the preview section (navigate to step 5)
    console.log('📋 Preview clicked - Showing preview');
    
    // Save data first
    const dataToSave = {
      productName: formData.productName,
      tagline: formData.tagline,
      category: formData.category,
      subCategory: formData.subCategory,
      productTags: formData.productTags,
      features: formData.features,
      documentationLinks: formData.documentationLinks,
      integrations: formData.integrations,
      pricingModel: formData.pricingModel,
      billingCycle: formData.billingCycle,
      plans: formData.plans,
    };
    localStorage.setItem('productFormData', JSON.stringify(dataToSave));
    
    // Navigate to preview step with preview mode flag
    setIsPreviewMode(true);
    setCurrentStep(5);
  };

  const handleSave = () => {
    // Update max completed step to current step if higher
    if (currentStep > maxCompletedStep) {
      const newMax = currentStep;
      setMaxCompletedStep(newMax);
      localStorage.setItem('maxCompletedStep', newMax.toString());
    }
    
    // Save data and redirect to dashboard
    const dataToSave = {
      productName: formData.productName,
      tagline: formData.tagline,
      category: formData.category,
      subCategory: formData.subCategory,
      productTags: formData.productTags,
      features: formData.features,
      documentationLinks: formData.documentationLinks,
      integrations: formData.integrations,
      pricingModel: formData.pricingModel,
      billingCycle: formData.billingCycle,
      plans: formData.plans,
    };
    localStorage.setItem('productFormData', JSON.stringify(dataToSave));
    console.log('💾 Save clicked - Saving and redirecting to dashboard');
    
    // Redirect to dashboard
    router.push('/dashboard/products');
  };

  const breadcrumbs = [
    { label: 'Products', href: '/dashboard/products' },
    { label: 'New product' },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      {/* Progress Tabs with Action Buttons */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* Step Tabs */}
          <div className="flex gap-8">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => index < currentStep && setCurrentStep(step.id)}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  currentStep === step.id
                    ? 'border-indigo-600 text-indigo-600'
                    : currentStep > step.id
                    ? 'border-transparent text-gray-500 hover:text-gray-700'
                    : 'border-transparent text-gray-400 cursor-not-allowed'
                }`}
                disabled={step.id > currentStep}
              >
                {step.name}
              </button>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 pb-4">
            <button
              onClick={handlePreview}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Preview
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl">
        {currentStep === 1 && (
          <BasicDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 2 && (
          <Features
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <PlansAndPricing
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        
        {/* Compliance Step */}
        {currentStep === 4 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Compliance</h2>
              <p className="text-sm text-gray-600 mb-6">
                This step will be implemented later
              </p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={handleBack}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Preview Section - Shown when Preview button is clicked or when navigating to step 5 */}
        {currentStep === 5 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Preview</h2>
              <p className="text-sm text-gray-600 mb-6">
                Review all your product details. Use the "Save" button above to save and return to dashboard.
              </p>
              
              <div className="bg-white border rounded-lg p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Summary</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Basic Details */}
                    <div className="col-span-2 border-b pb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Basic Details</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Product Name</p>
                          <p className="text-gray-900 font-medium">{formData.productName || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Tagline</p>
                          <p className="text-gray-600">{formData.tagline || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Category</p>
                          <p className="text-gray-900">{formData.category || 'Not selected'} {formData.subCategory && `/ ${formData.subCategory}`}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Tags</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {formData.productTags.length > 0 ? (
                              formData.productTags.map((tag: string, idx: number) => (
                                <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                  {tag}
                                </span>
                              ))
                            ) : (
                              <p className="text-gray-500 text-sm">No tags added</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="col-span-2 border-b pb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Features</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Product Features</p>
                          <p className="text-gray-900">{formData.features.length} feature(s) added</p>
                          {formData.features.length > 0 && (
                            <ul className="mt-2 space-y-1">
                              {formData.features.map((feature: any, idx: number) => (
                                <li key={idx} className="text-sm text-gray-600">• {feature.title}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Documentation Links</p>
                          <p className="text-gray-900">{formData.documentationLinks.length} link(s) added</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Integrations</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {formData.integrations.length > 0 ? (
                              formData.integrations.map((integration: string, idx: number) => (
                                <span key={idx} className="px-2 py-1 text-xs bg-indigo-50 text-indigo-700 rounded">
                                  {integration}
                                </span>
                              ))
                            ) : (
                              <p className="text-gray-500 text-sm">No integrations added</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Plans & Pricing */}
                    <div className="col-span-2">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Plans & Pricing</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Pricing Model</p>
                          <p className="text-gray-900 capitalize">{formData.pricingModel.replace('-', ' ')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Billing Cycle</p>
                          <p className="text-gray-900 capitalize">{formData.billingCycle}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Plans</p>
                          <p className="text-gray-900">{formData.plans.length} plan(s) added</p>
                          {formData.plans.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {formData.plans.map((plan: any, idx: number) => (
                                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium text-gray-900">{plan.name}</p>
                                    {plan.badge && (
                                      <span className="px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded">
                                        {plan.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">
                                    ${plan.monthlyPrice}/mo • ${plan.yearlyPrice}/yr
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Conditional Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              {isPreviewMode ? (
                // Preview Mode: Show only "Back to Form" button
                <button
                  onClick={() => {
                    setIsPreviewMode(false);
                    setCurrentStep(1);
                  }}
                  className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back to Form
                </button>
              ) : (
                // Normal Navigation Mode: Show Back and Next buttons
                <>
                  <button
                    onClick={handleBack}
                    className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    Next
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Payment Step */}
        {currentStep === 6 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment</h2>
              <p className="text-sm text-gray-600 mb-6">
                This step will be implemented later
              </p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={handleBack}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}


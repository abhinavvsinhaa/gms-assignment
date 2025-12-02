'use client';

import { useState } from 'react';
import { Upload, Info, Search, X } from 'lucide-react';

interface BasicDetailsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const categories = [
  'Marketing',
  'Sales',
  'Development',
  'Design',
  'Analytics',
  'Customer Support',
];

const subCategories = [
  'Email Marketing',
  'Social Media',
  'SEO',
  'Content Marketing',
  'Advertising',
  'Automation',
];

const suggestedTags = ['SaaS', 'B2B', 'Cloud', 'API', 'Mobile', 'Enterprise', 'Startup', 'Analytics'];

export default function BasicDetails({ formData, updateFormData, onNext, onBack }: BasicDetailsProps) {
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf' && file.size <= 20 * 1024 * 1024) {
      updateFormData('pdfFile', file);
    } else {
      alert('Please upload a PDF file under 20 MB');
    }
  };

  const addTag = (tag: string) => {
    if (tag && !formData.productTags.includes(tag)) {
      updateFormData('productTags', [...formData.productTags, tag]);
      setTagInput('');
      setShowTagSuggestions(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateFormData('productTags', formData.productTags.filter((tag: string) => tag !== tagToRemove));
  };

  const taglineLength = formData.tagline.length;
  const maxTaglineLength = 60;

  return (
    <div className="space-y-8">
      {/* Autofill Application */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Autofill Application</h2>
        <p className="text-sm text-gray-600 mb-6">
          Upload your product documentation in seconds with autofill option
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            id="pdf-upload"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label htmlFor="pdf-upload" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="text-indigo-600 font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">Only PDF files (max. 20 MB)</p>
              {formData.pdfFile && (
                <p className="mt-2 text-sm text-green-600">✓ {formData.pdfFile.name}</p>
              )}
            </div>
          </label>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          The file will be read to automatically fill in the listing details.
        </p>
      </div>

      {/* Product Name */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          Product name <span className="text-red-500">*</span>
          <Info className="w-4 h-4 text-gray-400" />
        </label>
        <input
          type="text"
          value={formData.productName}
          onChange={(e) => updateFormData('productName', e.target.value)}
          placeholder="Enter product name"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Tagline */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          Tagline <span className="text-red-500">*</span>
          <Info className="w-4 h-4 text-gray-400" />
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => {
              if (e.target.value.length <= maxTaglineLength) {
                updateFormData('tagline', e.target.value);
              }
            }}
            placeholder="Enter short description"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {taglineLength}/{maxTaglineLength}
          </div>
        </div>
      </div>

      {/* Category and Sub-Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
            <Info className="w-4 h-4 text-gray-400" />
          </label>
          <select
            value={formData.category}
            onChange={(e) => updateFormData('category', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Sub-Category <span className="text-red-500">*</span>
            <Info className="w-4 h-4 text-gray-400" />
          </label>
          <select
            value={formData.subCategory}
            onChange={(e) => updateFormData('subCategory', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="">Select sub-category</option>
            {subCategories.map((subCat) => (
              <option key={subCat} value={subCat}>
                {subCat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Tags */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          Product Tags <span className="text-red-500">*</span>
          <Info className="w-4 h-4 text-gray-400" />
        </label>
        
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={tagInput}
              onChange={(e) => {
                setTagInput(e.target.value);
                setShowTagSuggestions(true);
              }}
              onFocus={() => setShowTagSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && tagInput.trim()) {
                  e.preventDefault();
                  addTag(tagInput.trim());
                }
              }}
              placeholder="Add tags"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Tag Suggestions */}
          {showTagSuggestions && tagInput && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              {suggestedTags
                .filter(tag => tag.toLowerCase().includes(tagInput.toLowerCase()))
                .map((tag) => (
                  <button
                    key={tag}
                    onClick={() => addTag(tag)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    {tag}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Selected Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {suggestedTags.slice(0, 4).map((tag) => (
            <button
              key={tag}
              onClick={() => addTag(tag)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Added Tags */}
        {formData.productTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.productTags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-md"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="hover:text-indigo-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

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


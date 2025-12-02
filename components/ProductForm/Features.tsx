'use client';

import { useState } from 'react';
import { Upload, Plus, X, Info, Search } from 'lucide-react';
import RichTextEditor from './RichTextEditor';

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

interface FeaturesProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Features({ formData, updateFormData, onNext, onBack }: FeaturesProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [integrationInput, setIntegrationInput] = useState('');
  const [showIntegrationSuggestions, setShowIntegrationSuggestions] = useState(false);

  const features: Feature[] = formData.features || [];
  const mediaFiles: MediaFile[] = formData.mediaFiles || [];
  const documentationLinks: string[] = formData.documentationLinks || [];
  const integrations: string[] = formData.integrations || [];
  const [docLinkInput, setDocLinkInput] = useState('');

  const suggestedIntegrations = ['Slack', 'Zapier', 'Salesforce', 'HubSpot', 'Google Workspace', 'Microsoft Teams', 'Jira', 'Asana'];

  // Product Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      updateFormData('productLogo', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Features Management
  const addFeature = () => {
    if (features.length < 6) {
      const newFeature: Feature = {
        id: Date.now().toString(),
        title: '',
        description: '',
      };
      updateFormData('features', [...features, newFeature]);
    }
  };

  const updateFeature = (id: string, field: 'title' | 'description', value: string) => {
    const updatedFeatures = features.map((f) =>
      f.id === id ? { ...f, [field]: value } : f
    );
    updateFormData('features', updatedFeatures);
  };

  const removeFeature = (id: string) => {
    const updatedFeatures = features.filter((f) => f.id !== id);
    updateFormData('features', updatedFeatures);
  };

  // Media Upload
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const images = mediaFiles.filter(m => m.type === 'image').length;
    const videos = mediaFiles.filter(m => m.type === 'video').length;

    const newMedia: MediaFile[] = [];
    
    files.forEach((file) => {
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');

      if (isVideo && videos < 1) {
        const preview = URL.createObjectURL(file);
        newMedia.push({
          id: Date.now().toString() + Math.random(),
          file,
          preview,
          type: 'video',
        });
      } else if (isImage && images + newMedia.filter(m => m.type === 'image').length < 5) {
        const preview = URL.createObjectURL(file);
        newMedia.push({
          id: Date.now().toString() + Math.random(),
          file,
          preview,
          type: 'image',
        });
      }
    });

    updateFormData('mediaFiles', [...mediaFiles, ...newMedia]);
  };

  const removeMedia = (id: string) => {
    const updatedMedia = mediaFiles.filter((m) => m.id !== id);
    updateFormData('mediaFiles', updatedMedia);
  };

  // Documentation Links
  const addDocLink = () => {
    const trimmedLink = docLinkInput.trim();
    if (trimmedLink) {
      // Basic URL validation
      try {
        new URL(trimmedLink);
      } catch {
        alert('Please enter a valid URL (e.g., https://example.com/docs)');
        return;
      }
      
      // Check for duplicates
      if (documentationLinks.includes(trimmedLink)) {
        alert('This documentation link has already been added');
        return;
      }
      
      updateFormData('documentationLinks', [...documentationLinks, trimmedLink]);
      setDocLinkInput('');
    }
  };

  const removeDocLink = (index: number) => {
    const updated = documentationLinks.filter((_, i) => i !== index);
    updateFormData('documentationLinks', updated);
  };

  // Integrations
  const addIntegration = (integration: string) => {
    if (integration && !integrations.includes(integration)) {
      updateFormData('integrations', [...integrations, integration]);
      setIntegrationInput('');
      setShowIntegrationSuggestions(false);
    }
  };

  const removeIntegration = (integration: string) => {
    updateFormData('integrations', integrations.filter((i: string) => i !== integration));
  };

  const handleNext = () => {
    // Validate at least one feature
    if (features.length === 0 || features.some(f => !f.title || !f.description)) {
      alert('Please add at least one feature with title and description');
      return;
    }
    if (documentationLinks.length === 0) {
      alert('Please add at least one documentation link');
      return;
    }
    if (integrations.length === 0) {
      alert('Please add at least one supported integration');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-8">
      {/* Product Logo */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          Product logo <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          id="logo-upload"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />
        <label htmlFor="logo-upload">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <Upload className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Upload logo</span>
          </div>
        </label>
        {logoPreview && (
          <div className="mt-3">
            <img src={logoPreview} alt="Logo preview" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
          </div>
        )}
      </div>

      {/* Features Section */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">Features (Up to 6)</h3>
        <p className="text-sm text-gray-600 mb-6">
          List and describe the key features of your product. Highlight what makes your product valuable, unique, and useful for customers. Use bullet points or short paragraphs to keep it scannable.
        </p>

        <div className="space-y-6">
          {features.map((feature) => (
            <div key={feature.id} className="relative p-6 border border-gray-200 rounded-lg bg-white">
              <button
                type="button"
                onClick={() => removeFeature(feature.id)}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                {/* Feature Title */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Feature title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                    placeholder="Enter feature name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Feature Description */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <RichTextEditor
                    value={feature.description}
                    onChange={(value) => updateFeature(feature.id, 'description', value)}
                    placeholder="Enter feature description"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Feature Button */}
          {features.length < 6 && (
            <button
              type="button"
              onClick={addFeature}
              className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add Feature</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Media Upload */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          Media (Up to 5 images& 1 video) <span className="text-red-500">*</span>
        </label>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            id="media-upload"
            accept="image/*,video/*"
            multiple
            onChange={handleMediaUpload}
            className="hidden"
          />
          <label htmlFor="media-upload" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Upload className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="text-indigo-600 font-medium">Browse</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG & MP4</p>
            </div>
          </label>
        </div>

        {/* Media Preview */}
        {mediaFiles.length > 0 && (
          <div className="grid grid-cols-5 gap-4 mt-4">
            {mediaFiles.map((media) => (
              <div key={media.id} className="relative group">
                {media.type === 'image' ? (
                  <img
                    src={media.preview}
                    alt="Preview"
                    className="w-full h-24 object-cover rounded-lg border border-gray-200"
                  />
                ) : (
                  <video
                    src={media.preview}
                    className="w-full h-24 object-cover rounded-lg border border-gray-200"
                  />
                )}
                <button
                  type="button"
                  onClick={() => removeMedia(media.id)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Documentation Links */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          Documentation Links <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={docLinkInput}
            onChange={(e) => setDocLinkInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDocLink())}
            placeholder="Add the documentation link"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addDocLink}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        
        {/* Added Links */}
        {documentationLinks.length > 0 && (
          <div className="mt-3 space-y-2">
            {documentationLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline truncate">
                  {link}
                </a>
                <button
                  type="button"
                  onClick={() => removeDocLink(index)}
                  className="ml-2 p-1 text-gray-400 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Supported Integrations */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          Supported Integrations <span className="text-red-500">*</span>
          <Info className="w-4 h-4 text-gray-400" />
        </label>
        
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={integrationInput}
              onChange={(e) => {
                setIntegrationInput(e.target.value);
                setShowIntegrationSuggestions(true);
              }}
              onFocus={() => setShowIntegrationSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && integrationInput.trim()) {
                  e.preventDefault();
                  addIntegration(integrationInput.trim());
                }
              }}
              placeholder="Add supported integrations"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Integration Suggestions */}
          {showIntegrationSuggestions && integrationInput && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto">
              {suggestedIntegrations
                .filter(int => int.toLowerCase().includes(integrationInput.toLowerCase()) && !integrations.includes(int))
                .map((integration) => (
                  <button
                    key={integration}
                    onClick={() => addIntegration(integration)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    {integration}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Added Integrations */}
        {integrations.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {integrations.map((integration: string) => (
              <span
                key={integration}
                className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-md"
              >
                {integration}
                <button
                  onClick={() => removeIntegration(integration)}
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
          onClick={handleNext}
          className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}


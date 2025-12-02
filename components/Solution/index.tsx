'use client';

import { useState } from 'react';
import Heading from '../ui/heading';
import { BadgeCheck } from 'lucide-react';

interface Feature {
  text: string;
}

interface SolutionTab {
  id: string;
  title: string;
  description: string;
  features: Feature[];
}

export default function Solution() {
  const solutions: SolutionTab[] = [
    {
      id: 'ai-matching',
      title: 'AI-Powered Matching',
      description:
        'Connect instantly with high-intent buyers. Our AI intelligently matches your SaaS products with customers ready to convert, boosting your sales opportunities.',
      features: [
        { text: 'Smart intent AI design between AI of buyer needs' },
        { text: 'Predictive recommendations AI of past buyer behavior' },
        { text: 'Real-time matching with verified vendors' },
        { text: 'Automated lead scoring and qualification' },
      ],
    },
    {
      id: 'leads-ranking',
      title: 'Leads & Ranking',
      description:
        'Get discovered by the right buyers through our intelligent ranking system based on relevance and user engagement.',
      features: [
        { text: 'Dynamic ranking algorithm based on user behavior' },
        { text: 'Priority placement for verified vendors' },
        { text: 'Real-time analytics on listing performance' },
        { text: 'Competitive insights and benchmarking' },
      ],
    },
    {
      id: 'compliance',
      title: 'Compliance & Security',
      description:
        'Enterprise-grade security and compliance features to protect your data and meet regulatory requirements.',
      features: [
        { text: 'SOC 2 Type II certified infrastructure' },
        { text: 'GDPR and CCPA compliant data handling' },
        { text: 'End-to-end encryption for all transactions' },
        { text: 'Regular security audits and penetration testing' },
      ],
    },
    {
      id: 'documents',
      title: 'Documents',
      description:
        'Centralized document management for proposals, contracts, and compliance documentation.',
      features: [
        { text: 'Automated proposal generation' },
        { text: 'Digital signature integration' },
        { text: 'Version control and audit trails' },
        { text: 'Template library for common documents' },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(solutions[0].id);
  const activeSolution = solutions.find((s) => s.id === activeTab) || solutions[0];

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">

        <Heading
          size={"sm"}
          heading='Meet GMS — The Marketplace Built for SaaS Growth'
          subheading='GMS uses AI-powered matching to connect SaaS vendors with verified, high-intent buyers. Stop chasing leads — let GMS bring them to you.'
        />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row p-1 bg-gray-50 border border-gray-200 rounded-xl gap-1">
            {solutions.map((solution) => (
              <div
                key={solution.id}
                onClick={() => setActiveTab(solution.id)}
                className={`flex-1 flex justify-center items-center cursor-pointer rounded-xl transition-all duration-300 py-3 px-4 min-h-12 ${
                  activeTab === solution.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:bg-accent/10 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center text-center">
                  <span className="font-semibold text-sm sm:text-base leading-tight">
                    {solution.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between px-8 md:px-0 py-8 min-h-[500px]">
            <div className='flex flex-col justify-center w-full md:w-1/2'>
              <div className="mb-8 md:pr-8">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl md:text-4xl font-semibold text-gray-900">{activeSolution.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {activeSolution.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {activeSolution.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <BadgeCheck className='size-4 mr-3 text-green-600'/>
                    <span className="text-gray-800">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mockup/Screenshot Placeholder */}
            <div className="flex justify-center items-center w-full md:w-1/2 h-64 md:h-auto bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4">
              <p className="text-gray-400 text-xs font-medium">
                Screenshot goes here
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


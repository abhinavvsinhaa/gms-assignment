'use client';

import { ImageIcon } from "lucide-react";
import Heading from "../ui/heading";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'List Your Product',
      description: 'Add your SaaS tool, upload details, set pricing, and share your key features.',
    },
    {
      number: 2,
      title: 'Get Discovered',
      description:
        'Your product appears in AI-powered search results and category listings for buyers.',
    },
    {
      number: 3,
      title: 'Receive Orders',
      description:
        'Customers can subscribe instantly—no extra setup or payment gateway needed.',
    },
    {
      number: 4,
      title: 'Track & Grow',
      description:
        'Use your vendor dashboard to see sales, track performance, and manage customers.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <Heading
          heading="How GMS Works?"
          subheading="Discover how GMS streamlines your path to success, from listing your product to scaling globally. Learn how our platform simplifies every step with ease and efficiency."
          size="sm"
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:border-t border-primary md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">

              <div className="relative z-10 text-center">

                <div className="hidden lg:flex  absolute -top-28 left-1/2 transform -translate-x-1/2  flex-col items-center justify-center">
                  <div
                    style={{
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderTop: '12px solid var(--color-primary)',
                      width: 0,
                      height: 0,
                    }}
                    className="text-primary mb-5"
                  />

                  <div className="w-6 h-6 rounded-full bg-primary text-white mb-10 shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Icon/Image Placeholder */}
                <div className="border md:mt-28 text-left border-gray-200 rounded-xl p-6 mb-4 hover:shadow-md transition-shadow duration-300">
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  
                  <div className="w-full h-52 mt-10 bg-gray-100 border border-gray-300 border-dashed rounded-2xl flex items-center justify-center">
                    <ImageIcon className="size-12 text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


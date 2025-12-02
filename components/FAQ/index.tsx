'use client';

import { useState } from 'react';
import Heading from '../ui/heading';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const faqs: FAQItem[] = [
    {
      question: 'How does GMS list our products on the site?',
      answer:
        'GMS uses AI to automatically generate product listings based on your website and product information. You can also manually create and customize your listing to highlight key features and benefits.',
    },
    {
      question: 'How does GMS AI verify buyers?',
      answer:
        'Our AI analyzes buyer behavior, company information, and intent signals to verify that prospects are genuine decision-makers from real companies actively looking for SaaS solutions.',
    },
    {
      question: 'How does GMS vet providers on our site?',
      answer:
        'We conduct a thorough vetting process including company verification, product validation, security checks, and review analysis to ensure all vendors meet our quality standards.',
    },
    {
      question: 'Is my data and information of customers 100% secure?',
      answer:
        'Yes, we employ enterprise-grade security including SOC 2 Type II certification, end-to-end encryption, and strict data privacy controls to protect all customer and vendor information.',
    },
    {
      question: 'Can I rank for and rank services on my site?',
      answer:
        'Yes, our platform provides analytics and insights on how your products rank. Ranking is determined by AI algorithms that consider relevance, user engagement, reviews, and other quality signals.',
    },
    {
      question: 'How quickly can I start getting orders after listing?',
      answer:
        'Most vendors see their first qualified leads within 24-48 hours of listing. Our AI immediately starts matching your product with relevant buyer searches and intent signals.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        
        <Heading
          size={"sm"}
          heading="Frequently Asked Questions"
          subheading="Everything you need to know before you hit “Start Selling.”"
        />

        {/* FAQ Items */}
        <div className="space-y-4 divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => toggleFAQ(index)}
              className="overflow-hidden hover:bg-gray-50 transition-colors duration-200"
            >
              <button className="w-full px-6 py-5 flex items-center justify-between transition-colors duration-200">
                <span className="text-left font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                
                <div className='text-gray-500'>
                  {openIndex === index ? (
                    <ChevronUp  />
                  ) : (
                    <ChevronDown />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="pl-6 pr-16 pb-8">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


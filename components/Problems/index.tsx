'use client';

import { cn } from "@/lib/utils";
import Heading from "../ui/heading";
import { ImageIcon } from "lucide-react";

export default function Problems() {
  const problems = [
    {
      title: 'Soaring Customer Acquisition Costs',
      description:
        'Traditional ad spend is out of control and ROI is vanishing faster than you can track.',
    },
    {
      title: 'Fragmented Acquisition Channels',
      description:
        `You're juggling multiple platforms—ads, content, reviews—with zero ability to unify the journey.`,
    },
    {
      title: 'Low-Quality Unvetted Leads',
      description:
        'Sales teams waste time sifting through garbage leads that go nowhere.',
    },
    {
      title: 'Slow & Unscalable Conversions',
      description:
        'Your funnel is bloated. By the time someone converts, momentum is lost and interest has faded.',
    },
    {
      title: 'Minimal Leakage & Market Insights',
      description:
        `You're blind to real buyer behavior, intent data, and what competitors are doing better.`,
    },
  ];

  return (
    <section id="why-gms" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        <Heading
          size={"sm"}
          heading="Why Traditional Acquisition Fails"
          subheading="Paid ads are costly. Lead quality is inconsistent. Channels are fragmented. You're spending more to get less — and it's slowing your growth"
        />

        {/* Problem Cards Grid */}
        <div className="flex flex-row flex-wrap">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={cn("p-4", {
                "w-full md:w-1/2": index < 2,
                "w-full md:w-1/3": index >= 2,
              })}
            >
              <div
                className={cn("bg-white flex flex-col rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-purple-300 group", {
                  "h-105": index < 2,
                  "h-96": index >= 2
                })}
              >
                <div className="grow w-full border border-dashed border-gray-400 bg-gray-100 rounded-lg flex items-center justify-center mb-6 text-3xl group-hover:scale-105 transition-transform duration-300">
                  <ImageIcon className="text-gray-300 w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
                <p className="text-gray-600 leading-relaxed">{problem.description}</p>
              </div>
            </div>
          ))}
          {/* Empty card for 2x3 grid visual balance */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}


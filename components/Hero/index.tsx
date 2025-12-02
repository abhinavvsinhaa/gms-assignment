'use client';

import { Sparkles } from "lucide-react";
import Image from "next/image";

import Button from "../ui/button";

export default function Hero() {
  return (
    <section className="relative">

      <div 
        className="relative w-full pt-32 px-4 sm:px-6 lg:px-8 pb-[20%]"
      >
        <div className="absolute pointer-events-none top-0 left-0 w-full h-full rounded-b-3xl sm:rounded-b-4xl from-[#F4806F] via-[#C54AB4] to-accent bg-linear-to-r opacity-20">
          <div
            style={{
              backgroundImage: 'linear-gradient(rgb(0 0 0 / 40%) 1px, transparent 1px), linear-gradient(90deg, rgb(0 0 0 / 36%) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(circle at center,rgba(0, 0, 0, 1) 0%,    rgba(0, 0, 0, 1) 30%,rgba(0, 0, 0, 0) 80%)',
              WebkitMaskImage: 'radial-gradient(circle at center,rgba(0, 0, 0, 1) 0%,    rgba(0, 0, 0, 1) 30%,rgba(0, 0, 0, 0) 80%)'
            }}
            className="absolute top-0 left-0 w-full h-full"/>
        </div>
        <div className="text-center z-10 relative max-w-7xl mx-auto">

          <div className="inline-flex items-center px-2 py-0.5 rounded-full text-[#3E40EE] border border-primary/50 font-medium text-xs sm:text-sm mb-10 md:mb-4">
            <Sparkles className="size-3 mr-2"/>
            AI Powered
          </div>


          <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6 leading-tight px-4">
            Turn SaaS Chaos Into
            <br />
            <span className="">
              Qualified&nbsp;
            </span>
            <span className="decoration-[#C54AB4] decoration-4 underline-offset-8 decoration-wavy underline">Conversions</span>

            <div className="absolute hidden md:flex flex-row top-1/4 text-gray-600 font-normal right-6 text-xl">
              <div className="w-28 h-30 relative mr-4">
                <Image 
                  src="/arrow.svg" 
                  alt="Arrow" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span>No fake leads.</span>
                <br/>
              <span>AI-verified buyers</span>
              </div>
            </div>

          </h1>


          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto mb-6 sm:mb-10 mt-8 md:mt-0 leading-relaxed md:px-4">
            GMS is the AI-powered SaaS marketplace where vendors meet verified buyers ready to convert. Cut CAC, close deals faster, and scale smarter — all from a single platform
          </p>


          <Button className="h-11 px-4 font-semibold">
            Start your Free Vendor Trial
          </Button>

        </div>
      </div>


      <div className="absolute hidden md:block -bottom-[65%] left-1/2 -translate-x-1/2 w-[90%] sm:w-[85%] md:w-[80%] lg:w-full max-w-7xl px-4 sm:px-6">
        <div className="relative w-full" style={{ paddingBottom: '60%' }}>
          <Image 
            src="/dashboard-preview.svg" 
            alt="GMS Dashboard Preview" 
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

    </section>
  );
}


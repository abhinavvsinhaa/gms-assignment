'use client';

import Image from "next/image";

export default function SocialProof() {

  return (
    <section className="sm:mt-56 md:mt-72 lg:mt-96 pt-12 sm:pt-52 pb-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-gray-500 font-medium sm:mb-8 text-sm sm:text-base">
          Trusted by
        </p>
        <div className="relative h-20">
          <Image
            src={"/trusted-by-logos.svg"}
            alt="Social Proof Logos"
            fill
          />
        </div>
      </div>
    </section>
  );
}


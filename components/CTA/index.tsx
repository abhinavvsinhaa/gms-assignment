'use client';

import Image from "next/image";
import Button from "../ui/button";
import Container from "../ui/container";

export default function CTA() {
  return (
    <Container as={"section"} className="relative overflow-hidden mt-12 mx-8 lg:mx-24 mb-16 py-12 md:py-36 bg-linear-to-br from-[#963EC726] to-[#3E40EE26] border border-[#C94DFE80] shadow-md rounded-2xl">
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <span className="text-3xl text-center md:text-left md:text-5xl md:leading-14 font-semibold mx-auto">
          Your Next Buyer Is Already Waiting
        </span>

        <span className="text-center md:text-left text-gray-600 md:w-10/12">
          Imagine a pipeline filled with verified, high-intent buyers, predictable CAC, and scalable growth. With GMS, that future starts today.
        </span>

        <div className="relative mx-auto md:mx-0">
          <Button className="w-fit mt-4">
            Join the GMS Vendor Network
          </Button>

          <div className="absolute hidden md:flex flex-row items-center -top-6 right-12 text-gray-600 font-normal text-xl">
            <div className="w-28 h-30 rotate-220 relative mr-4">
              <Image 
                src="/arrow.svg" 
                alt="Arrow" 
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span>It&apos;s Free to Start</span>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute hidden md:block h-10/12 w-1/2 right-0 bottom-0">
        <div
          style={{
            backgroundImage: 'url("/dashboard-preview.svg")'
          }}
          className="top-0 z-1 left-0 absolute w-full h-full"
        />

        <div className="absolute z-0 bottom-[92%] right-[96%] w-24 h-24">
          <Image
            src={"/magic-wand.svg"}
            fill
            alt="Magic Wand"
          />
        </div>
      </div>

    </Container>
  );
}
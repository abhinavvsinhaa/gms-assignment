import { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva(
  "text-center pb-20 max-w-3xl mx-auto",
  {
    variants: {
      size: {
        sm: "space-y-4",
        md: "space-y-5",
        lg: "space-y-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const titleVariants = cva(
  "font-bold tracking-tight",
  {
    variants: {
      size: {
        sm: "text-2xl sm:text-3xl",
        md: "text-3xl sm:text-4xl lg:text-5xl",
        lg: "text-4xl sm:text-5xl lg:text-6xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const subtitleVariants = cva(
  "text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-sm sm:text-base",
        md: "text-base sm:text-lg",
        lg: "text-lg sm:text-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface HeadingProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headingVariants> {
  heading: string;
  subheading?: string;
}

export default function Heading({
  heading,
  subheading,
  size,
  className,
  ...props
}: HeadingProps) {
  return (
    <div className={cn(headingVariants({ size, className }))} {...props}>
      <h2 className={cn(titleVariants({ size }))}>
        {heading}
      </h2>
      {subheading && (
        <p className={cn(subtitleVariants({ size }))}>
          {subheading}
        </p>
      )}
    </div>
  );
}
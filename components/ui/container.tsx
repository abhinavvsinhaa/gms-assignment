import { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ContainerProps {
    children: ReactNode;
    as?: ElementType;
    className?: string;
}

export default function Container({ children, as = 'div', className = '' }: ContainerProps) {
    const Component = as;

    return (
        <Component className={cn("max-w-8xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
            {children}
        </Component>
    );
}
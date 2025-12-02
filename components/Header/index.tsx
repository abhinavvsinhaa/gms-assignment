'use client';

import Logo from '@/components/Logo';
import { Bell, Menu, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Container from '../ui/container';
import Button from '../ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const items = [
    { id: 'why-gms', label: 'Why GMS' },
    { id: 'how-it-works', label: 'How GMS works' },
    { id: 'products', label: 'Product Lists' },
    { id: 'compliances', label: 'Compliances' },
  ]

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <Container as={"nav"} className='pt-3 md:pt-0' >
        <div className="flex justify-between items-center h-16">

          <div className="shrink-0">
            <Logo />
          </div>

          <div className='flex flex-row'>

            <div className="hidden md:flex items-center justify-center">
              {items.map((item) => (
                <Button key={item.id} className='text-gray-700 px-2.5' onClick={() => scrollToSection(item.id)} variant={"link"}>
                  {item.label}
                </Button>
              ))}

            </div>


            <div className="hidden md:flex items-center space-x-4">
              <Link href="/dashboard">
                <Button className='mx-8 rounded-4xl'>
                  Login
                </Button>
              </Link>

              <Button className='text-gray-700' variant="icon" size="icon">
                <Bell />
              </Button>

              <Button className='text-gray-700' variant="icon" size="icon">
                <ShoppingCart />
              </Button>
            </div>
          </div>


          <div className="md:hidden">
            <Button className='px-2' variant={isMenuOpen ? "default" : "link"} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-4 shadow-md py-4 bg-white z-50 rounded-2xl border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col items-center justify-center">
                {items.map((item) => (
                  <Button key={item.id} className='text-gray-700 px-2.5' onClick={() => scrollToSection(item.id)} variant={"link"}>
                    {item.label}
                  </Button>
                ))}

              </div>
              <Link href="/dashboard">
                <Button className='w-fit mx-auto rounded-4xl'>
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}


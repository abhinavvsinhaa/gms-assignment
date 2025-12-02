'use client';

import Logo from '@/components/Logo';
import Container from '../ui/container';

export default function Footer() {
  const footerLinks = {
    platform: [
      { name: 'Consumer', href: '#consumer' },
      { name: 'Vendor', href: '#vendor' },
      { name: 'Affiliate', href: '#affiliate' },
      { name: 'Service Provider', href: '#service-provider' },
    ],
    company: [
      { name: 'About us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Blogs', href: '#blog' },
      { name: 'Contact', href: '#contact' },
    ],
    legal: [
      { name: 'Terms', href: '#terms' },
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Cookies', href: '#cookies' },
    ],
  }

  return (
    <Container as={'footer'} className='py-6 md:py-12 border-t border-gray-200'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-20 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-700 leading-relaxed mb-6 max-w-md">
              Design amazing digital experiences that create more happy in the world.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-700">
              © 2025 GMS. All rights reserved.
            </p>
          </div>
        </div>
    </Container>
  );
}


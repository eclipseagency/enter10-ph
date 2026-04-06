'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import LanguageSwitch from '@/components/ui/LanguageSwitch';

const NAV_I18N_KEYS: Record<string, string> = {
  '/': 'nav.home',
  '/activities': 'nav.activities',
  '/packages': 'nav.packages',
  '/booking': 'nav.book',
  '/contact': 'nav.contact',
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.png" alt="Enter10" width={48} height={48} className="h-10 w-auto" />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isBookNow = link.href === '/booking';
            const isActive = pathname === link.href;

            if (isBookNow) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="ml-2 rounded-full bg-neon-gold px-5 py-2 font-bold text-black transition-all hover:brightness-110 glow-gold uppercase"
                  style={{ fontSize: '13px', letterSpacing: '1px' }}
                >
                  {t(NAV_I18N_KEYS[link.href])}
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 font-medium ${
                  isActive
                    ? 'text-neon-blue'
                    : 'text-text-muted hover:text-white'
                }`}
                style={{ fontSize: '14px', transition: 'color 250ms' }}
              >
                {t(NAV_I18N_KEYS[link.href])}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-neon-blue" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side: language + hamburger */}
        <div className="flex items-center gap-3">
          <LanguageSwitch />

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-colors hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => {
              const isBookNow = link.href === '/booking';
              const isActive = pathname === link.href;

              if (isBookNow) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 rounded-full bg-neon-gold px-4 py-2.5 text-center font-bold text-black transition-all hover:brightness-110 uppercase"
                    style={{ fontSize: '13px', letterSpacing: '1px' }}
                  >
                    {t(NAV_I18N_KEYS[link.href])}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-2.5 font-medium ${
                    isActive
                      ? 'text-neon-blue bg-white/5'
                      : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}
                  style={{ fontSize: '14px', transition: 'color 250ms' }}
                >
                  {t(NAV_I18N_KEYS[link.href])}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

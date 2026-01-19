'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from './common/Button';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import ThemeSwitcher from './common/ThemeSwitcher';

interface NavItem {
  label: string;
  link: string;
  dropdown?: { label: string; link: string }[];
}

const NAV: NavItem[] = [
  { label: 'Home', link: '/' },
  { label: 'About', link: '/about' },
  { label: 'Services', link: '/services' },
  { label: 'Case Studies', link: '/case-studies' },
  // {
  //   label: 'Services',
  //   link: '/services',
  //   dropdown: [
  //     { label: 'Web Development', link: '/services/web' },
  //     { label: 'Mobile Apps', link: '/services/mobile' },
  //   ],
  // },
  { label: 'Contact', link: '/contact' },
];

export default function Header() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMobile, setActiveMobile] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const heroPages = ['/', '/about', '/services'];
  const hasHero = heroPages.includes(pathname);

  useEffect(() => {
    if (!hasHero) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasHero]);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-4 left-2 right-2 sm:left-4 sm:right-4 z-50 max-w-7xl mx-auto">
        <div
          className={`rounded-3xl px-6 py-4 shadow-2xl backdrop-blur-md ${!scrolled && hasHero ? 'bg-[rgba(0,0,0,0.1)]' : 'bg-header'}`}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold logo-font">
              #Treta
            </Link>

         {/* DESKTOP NAV */}
          <nav className="hidden lg:flex gap-8 relative">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setDesktopDropdown(item.label)}
                onMouseLeave={() => setDesktopDropdown(null)}
              >
                {/* TRIGGER */}
                <Link
                  href={item.link}
                  className={`font-medium flex items-center ${!scrolled && hasHero ? 'text-white' : 'text-foreground'} hover:text-primary transition-colors`}
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown size={14} className="ml-1" />
                  )}
                </Link>

                {/* HOVER BRIDGE */}
                {item.dropdown && desktopDropdown === item.label && (
                  <div className="absolute left-0 top-full h-3 w-full" />
                )}

                {/* DROPDOWN */}
                {item.dropdown && desktopDropdown === item.label && (
                  <div
                    className="absolute left-0 top-[calc(100%+12px)] w-48 rounded-2xl p-2 shadow-xl backdrop-blur-2xl bg-background text-foreground z-1000"
                  >
                    {item.dropdown.map((d) => (
                      <Link
                        key={d.label}
                        href={d.link}
                        className="block px-4 py-2 rounded-lg bg-dropdown"
                      >
                        {d.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>


            {/* RIGHT */}
            <div className={`flex items-center gap-3 ${!scrolled && hasHero ? 'text-white' : 'text-foreground'}`}>
              <ThemeSwitcher />

              <button
                type="button"
                className={`lg:hidden appearance-none bg-transparent outline-none focus:outline-none active:bg-transparent ${!scrolled && hasHero ? 'text-white' : 'text-foreground'}`}
                onClick={() => setMobileOpen(true)}
              >
                <Menu />
              </button>

              <Button
                href="/get-started"
                icon="arrow-up-right"
                className={`hidden! lg:inline-flex! bg-transparent ${!scrolled && hasHero ? 'text-white' : 'text-foreground'} items-center justify-center  hover:text-primary rounded-full py-3 px-5 text-lg appearance-none transition-colors`}
                variant='tertiary'
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* BACKDROP */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-51 backdrop-blur-md"
          style={{ background: 'rgba(0,0,0,0.2)' }}
          onClick={() => {
            setMobileOpen(false);
            setActiveMobile(null);
          }}
        />
      )}

      {/* MOBILE BOTTOM SHEET */}
      <div
        className={`fixed inset-x-0 bottom-0 z-52 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${mobileOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div
          className="relative rounded-t-[28px] max-h-[88dvh] overflow-hidden
          shadow-[0_-20px_60px_rgba(0,0,0,.35)] backdrop-blur-2xl bg-background"
        >
          {/* DRAG HANDLE */}
          <div className="flex justify-center py-3">
            <div className="h-1.5 w-12 rounded-full bg-[rgba(0,0,0,0.25)]" />
          </div>

          {/* HEADER */}
          <div className="relative z-20 flex justify-between px-6 pb-4">
            <span className="text-xl font-semibold">Menu</span>
            <button
              type="button"
              className="appearance-none bg-transparent outline-none focus:outline-none active:bg-transparent"
              onClick={() => {
                setMobileOpen(false);
                setActiveMobile(null);
              }}
            >
              <X />
            </button>
          </div>


          {/* NAV */}
          <nav className="relative z-10 px-6 pb-8 space-y-4 overflow-y-auto">
            {NAV.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      className="
                        flex w-full justify-between py-3 text-lg font-medium
                        appearance-none bg-transparent outline-none
                        focus:outline-none active:bg-transparent
                      "
                      onClick={() =>
                        setActiveMobile(
                          activeMobile === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={`transition-transform ${
                          activeMobile === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {activeMobile === item.label && (
                      <div
                        className="ml-4 mt-2 rounded-xl p-4 backdrop-blur-xl relative z-20 bg-dropdown-mobile"
                      >
                        {item.dropdown.map((d) => (
                          <Link
                            key={d.label}
                            href={d.link}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 opacity-80 appearance-none"
                          >
                            {d.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.link}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-lg font-medium appearance-none"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

              <Button
                href="/get-started"
                icon="arrow-right"
                onClick={() => setMobileOpen(false)}
                className="mt-8 inline-flex items-center justify-center rounded-full py-4 text-lg appearance-none"
                variant='primary'
              >
                Get Started
              </Button>
          </nav>
        </div>
      </div>
    </>
  );
}

'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.2 });
    }

    document.addEventListener('click', onClick);

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        requestAnimationFrame(() => lenis.scrollTo(target as HTMLElement, { immediate: true }));
      }
    }

    return () => {
      document.removeEventListener('click', onClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (prevPathnameRef.current === pathname) return;

    prevPathnameRef.current = pathname;
    lenisRef.current?.scrollTo(0, { immediate: false });
  }, [pathname]);

  return <>{children}</>;
}

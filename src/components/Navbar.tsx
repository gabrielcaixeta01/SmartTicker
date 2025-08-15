'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isResultPage = pathname.startsWith('/result');

  const handleScroll = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <nav className="bg-black/80 backdrop-blur-md text-gray-200 shadow-lg px-8 py-4 fixed top-0 w-full z-50 flex justify-between items-center">
      <Link
        href="/"
        className="text-xl tracking-wide font-extralight text-white hover:text-blue-400 transition-colors duration-500"
      >
        SmartTicker
      </Link>

      <ul className="flex space-x-8 text-sm font-light">
        {isResultPage ? (
          <>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => router.push('/')}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => handleScroll('summary')}
            >
              Summary
            </li>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => handleScroll('price')}
            >
              Price
            </li>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => handleScroll('technical')}
            >
              Technical
            </li>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => handleScroll('news')}
            >
              News
            </li>
          </>
        ) : (
          <>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => handleScroll('home')}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => handleScroll('about')}
            >
              About
            </li>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => handleScroll('contact')}
            >
              Contact
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
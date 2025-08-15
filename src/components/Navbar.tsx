"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu } from "@headlessui/react";
import { FaBars } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isResultPage = pathname.startsWith("/result");

  const handleScroll = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <nav className="bg-black/80 backdrop-blur-md text-gray-200 shadow-lg px-4 md:px-8 py-4 fixed top-0 w-full z-50 flex justify-between items-center">
      <Link
        href="/"
        className="text-xl tracking-wide font-extralight text-white hover:text-blue-400 transition-colors duration-500"
      >
        SmartTicker
      </Link>

      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-8 text-sm font-light">
        {isResultPage ? (
          <>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => router.push("/")}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => handleScroll("summary")}
            >
              Summary
            </li>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => handleScroll("price")}
            >
              Price
            </li>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => handleScroll("technical")}
            >
              Technical
            </li>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => handleScroll("news")}
            >
              News
            </li>
          </>
        ) : (
          <>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => handleScroll("home")}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => handleScroll("about")}
            >
              About
            </li>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => handleScroll("contact")}
            >
              Contact
            </li>
          </>
        )}
      </ul>

      {/* Mobile menu */}
      <div className="md:hidden">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center px-2 py-1 rounded hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <FaBars className="text-xl" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-zinc-900 border border-zinc-700 divide-y divide-zinc-700 rounded-md shadow-lg focus:outline-none z-50">
            <div className="py-1">
              {isResultPage ? (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-zinc-800 text-blue-400" : "text-gray-200"
                        }`}
                        onClick={() => router.push("/")}
                      >
                        Home
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-zinc-800 text-blue-400" : "text-gray-200"
                        }`}
                        onClick={() => handleScroll("summary")}
                      >
                        Summary
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-zinc-800 text-blue-400" : "text-gray-200"
                        }`}
                        onClick={() => handleScroll("price")}
                      >
                        Price
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-zinc-800 text-blue-400" : "text-gray-200"
                        }`}
                        onClick={() => handleScroll("technical")}
                      >
                        Technical
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-zinc-800 text-blue-400" : "text-gray-200"
                        }`}
                        onClick={() => handleScroll("news")}
                      >
                        News
                      </button>
                    )}
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-zinc-800 text-blue-400" : "text-gray-200"
                        }`}
                        onClick={() => handleScroll("home")}
                      >
                        Home
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-zinc-800 text-blue-400" : "text-gray-200"
                        }`}
                        onClick={() => handleScroll("about")}
                      >
                        About
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-zinc-800 text-blue-400" : "text-gray-200"
                        }`}
                        onClick={() => handleScroll("contact")}
                      >
                        Contact
                      </button>
                    )}
                  </Menu.Item>
                </>
              )}
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </nav>
  );
}

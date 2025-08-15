"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "@headlessui/react";
import CountryFlag from "react-country-flag";
import { useLang } from "@/context/lang";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const router = useRouter();

  const isResultPage = pathname?.startsWith("/result");

  const handleScroll = (sectionId: string) => {
    if (typeof window === "undefined") return;

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <nav
      aria-label="Primary"
      className="bg-black/80 backdrop-blur-md text-gray-200 shadow-lg px-4 md:px-8 py-4 fixed top-0 w-full z-50 flex justify-between items-center"
    >
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-xl tracking-wide font-extralight text-white hover:text-blue-400 transition-colors duration-500"
        >
          SmartTicker
        </Link>

        {/* Idioma Switch Dropdown */}
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button
            aria-label="Selecionar idioma"
            className="flex items-center gap-2 px-2 py-1 rounded border border-zinc-700 bg-zinc-900 text-xs font-semibold hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {lang === "pt" ? (
              <>
                <CountryFlag countryCode="BR" svg style={{ width: "1.2em", height: "1.2em" }} />
                <span>Português</span>
              </>
            ) : (
              <>
                <CountryFlag countryCode="US" svg style={{ width: "1.2em", height: "1.2em" }} />
                <span>English</span>
              </>
            )}
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right bg-zinc-900 border border-zinc-700 rounded-md shadow-lg focus:outline-none z-[60]">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
                      active ? "bg-zinc-800 text-blue-400" : "text-gray-200"
                    }`}
                    onClick={() => setLang("pt")}
                  >
                    <CountryFlag countryCode="BR" svg style={{ width: "1.2em", height: "1.2em" }} />
                    Português
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
                      active ? "bg-zinc-800 text-blue-400" : "text-gray-200"
                    }`}
                    onClick={() => setLang("en")}
                  >
                    <CountryFlag countryCode="US" svg style={{ width: "1.2em", height: "1.2em" }} />
                    English
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>

      {/* Menu de navegação (desktop) */}
      <ul className="hidden md:flex space-x-8 text-sm font-light">
        {isResultPage ? (
          <>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => router.push("/")}
            >
              {t("home")}
            </li>
            <li className="cursor-pointer hover:text-blue-400 transition" onClick={() => handleScroll("summary")}>
              {t("summary")}
            </li>
            <li className="cursor-pointer hover:text-blue-400 transition" onClick={() => handleScroll("price")}>
              {t("price")}
            </li>
            <li className="cursor-pointer hover:text-blue-400 transition" onClick={() => handleScroll("technical")}>
              {t("technical")}
            </li>
            <li className="cursor-pointer hover:text-blue-400 transition" onClick={() => handleScroll("news")}>
              {t("news")}
            </li>
          </>
        ) : (
          <>
            <li className="cursor-pointer hover:text-blue-400 transition" onClick={() => handleScroll("home")}>
              {t("home")}
            </li>
            <li className="cursor-pointer hover:text-blue-400 transition" onClick={() => handleScroll("about")}>
              {t("about")}
            </li>
            <li className="cursor-pointer hover:text-blue-400 transition" onClick={() => handleScroll("contact")}>
              {t("contact")}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
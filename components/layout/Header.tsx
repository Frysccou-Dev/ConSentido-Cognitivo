"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Recursos", href: "/recursos" },
  { name: "Talleres", href: "/talleres" },
  { name: "Cómo trabajo", href: "/como-trabajo" },
  { name: "Sobre mí", href: "/sobre-mi" },
  { name: "FAQ", href: "/faq" },
  { name: "Contacto", href: "/contacto" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header-style sticky top-0 z-50 bg-fondo shadow-sm border-b border-anillo-claro/20">
      <nav className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/ConSentido_Logo.jpeg"
            alt="ConSentido Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-title text-xl font-bold hidden sm:block">
            ConSentido
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-header hover:text-secundario-corazon transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden p-2 text-primario-cerebro"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-fondo border-t border-anillo-claro/20 absolute w-full px-4 py-4 flex flex-col gap-4 shadow-lg animate-in fade-in slide-in-from-top-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-header hover:text-secundario-corazon transition-colors text-lg"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

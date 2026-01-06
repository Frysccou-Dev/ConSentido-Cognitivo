"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Recursos", href: "/recursos" },
  { name: "Talleres", href: "/talleres" },
  { name: "Sobre nosotras", href: "/sobre-nosotras" },
  { name: "FAQ", href: "/faq" },
  { name: "Contacto", href: "/contacto" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { userData, logout } = useAuth();
  const { itemCount } = useCart();
  const isAdmin = userData?.rol === "admin" || userData?.rol === "super";

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <header className="header-style bg-fondo shadow-sm border-b border-anillo-claro/20 relative z-50">
      <nav className="container mx-auto px-4 lg:px-8 flex items-center justify-between relative z-50 bg-fondo">
        <Link href="/" className="flex items-center py-2">
          <Image
            src="/ConSentido-Logo.png"
            alt="ConSentido Cognitivo Logo"
            width={140}
            height={53}
            className="h-auto w-auto max-h-16 object-contain scale-125 origin-left"
            priority
          />
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

          <Link
            href="/carrito"
            className="relative group p-2 text-primario-cerebro hover:text-secundario-corazon transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secundario-corazon text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in-50">
                {itemCount}
              </span>
            )}
          </Link>

          {isAdmin && (
            <div className="flex items-center gap-3 ml-4">
              <Link
                href="/admin/pedidos"
                className="bg-secundario-corazon/10 text-secundario-corazon px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest border border-secundario-corazon/20 hover:bg-secundario-corazon hover:text-white transition-all shadow-sm"
              >
                Pedidos_
              </Link>
              <Link
                href="/admin/recursos"
                className="bg-primario-cerebro/10 text-primario-cerebro px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest border border-primario-cerebro/20 hover:bg-primario-cerebro hover:text-white transition-all shadow-sm"
              >
                Recursos_
              </Link>
              <button
                onClick={handleLogout}
                className="text-texto-secundario/50 hover:text-red-500 font-black text-[10px] uppercase tracking-widest transition-colors ml-2"
              >
                Logout
              </button>
            </div>
          )}
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
        <div className="md:hidden bg-fondo border-t border-anillo-claro/20 absolute top-full left-0 w-full px-4 py-8 flex flex-col gap-5 shadow-2xl z-40 animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-header hover:text-secundario-corazon transition-colors text-xl font-bold px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/carrito"
            className="text-header hover:text-secundario-corazon transition-colors text-xl font-bold px-2 py-1 flex items-center justify-between"
            onClick={() => setIsOpen(false)}
          >
            Carrito_
            {itemCount > 0 && (
              <span className="bg-secundario-corazon text-white text-xs px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>

          {isAdmin && (
            <div className="flex flex-col gap-3 border-t border-anillo-claro/10 mt-2 pt-4">
              <Link
                href="/admin/pedidos"
                className="text-secundario-corazon font-black text-xl px-2"
                onClick={() => setIsOpen(false)}
              >
                Gestión Pedidos_
              </Link>
              <Link
                href="/admin/recursos"
                className="text-primario-cerebro font-black text-xl px-2"
                onClick={() => setIsOpen(false)}
              >
                Gestión Recursos_
              </Link>
              <button
                onClick={handleLogout}
                className="text-texto-secundario/40 font-black text-lg px-2 text-left mt-4"
              >
                Cerrar Sesión_
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

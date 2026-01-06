"use client";

import { useState } from "react";
import { RecursoPDFSerializado } from "@/types/firebase-types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import Link from "next/link";

export default function DetalleRecursoClient({
  recurso,
}: {
  recurso: RecursoPDFSerializado;
}) {
  const router = useRouter();
  const { addToCart, items } = useCart();
  const { showToast } = useUI();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const isInCart = items.some((i) => i.id === recurso.id);

  const handleFreeDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/deliver-resource", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          recursoTitulo: recurso.titulo,
          urlArchivo: recurso.urlArchivo,
        }),
      });

      if (res.ok) {
        showToast("¡Mail enviado con éxito! Revisá tu casilla.", "success");
        setEmail("");
        setShowEmailForm(false);
      } else {
        showToast("Hubo un error al enviar el mail.", "error");
      }
    } catch {
      showToast("Error de conexión.", "error");
    } finally {
      setSending(false);
    }
  };

  const handleQuickAdd = () => {
    if (isInCart) {
      showToast("Ya está en el carrito", "info");
      return;
    }
    addToCart(recurso);
    showToast("Agregado al carrito", "success");
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 bg-fondo">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative aspect-square w-full rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src={recurso.urlImagen}
              alt={recurso.titulo}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl">
              <span className="text-xl font-black text-primario-cerebro italic">
                {recurso.precio === 0 ? "GRATIS_" : `$${recurso.precio}`}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-3">
                {recurso.categorias.map((cat) => (
                  <span
                    key={cat}
                    className="bg-anillo-claro/10 text-primario-cerebro px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                  >
                    #{cat}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-primario-cerebro uppercase tracking-tighter leading-[0.9] wrap-break-word">
                {recurso.titulo}
              </h1>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primario-cerebro/40">
                Sobre este material
              </h3>
              <p className="text-lg text-texto-principal opacity-70 font-medium leading-relaxed italic">
                {recurso.descripcion}
              </p>
            </div>

            <div className="flex flex-col gap-8 bg-white/50 p-10 rounded-[3rem] border-2 border-anillo-claro/10 backdrop-blur-sm">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/40">
                  Ideal para usar en
                </span>
                <div className="flex flex-wrap gap-4">
                  {recurso.publico.map((p) => (
                    <div key={p} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-secundario-corazon" />
                      <span className="font-black text-sm text-primario-cerebro uppercase">
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {!showEmailForm ? (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        if (recurso.precio === 0) {
                          setShowEmailForm(true);
                        } else {
                          addToCart(recurso);
                          router.push("/carrito");
                        }
                      }}
                      className="w-full bg-primario-cerebro text-fondo py-6 rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-anillo-oscuro hover:-translate-y-1 transition-all shadow-xl"
                    >
                      {recurso.precio === 0
                        ? "Obtener Material_"
                        : "Comprar ahora_"}
                    </button>

                    {recurso.precio > 0 && (
                      <button
                        onClick={handleQuickAdd}
                        className={`w-full py-5 rounded-3xl font-black text-[12px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border-2 ${
                          isInCart
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-primario-cerebro text-primario-cerebro hover:bg-primario-cerebro/5"
                        }`}
                      >
                        {isInCart ? "✓ En el carrito" : "Añadir al carrito_"}
                      </button>
                    )}
                  </div>
                ) : (
                  <form
                    onSubmit={handleFreeDownload}
                    className="flex flex-col gap-4 animate-in slide-in-from-top-4 duration-500"
                  >
                    <input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="w-full bg-fondo border-2 border-anillo-claro/20 rounded-2xl px-6 py-5 outline-none focus:border-primario-cerebro font-bold"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      disabled={sending}
                      className="w-full bg-secundario-corazon text-white py-6 rounded-3xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg disabled:opacity-50"
                    >
                      {sending ? "Enviando..." : "Enviar a mi Mail_"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      className="text-[10px] font-black uppercase text-primario-cerebro/40 hover:text-primario-cerebro transition-colors"
                    >
                      Cancelar
                    </button>
                  </form>
                )}
              </div>
            </div>

            <Link
              href="/recursos"
              className="group flex items-center gap-4 text-primario-cerebro/40 hover:text-primario-cerebro transition-all"
            >
              <span className="text-2xl transition-transform group-hover:-translate-x-2">
                ←
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest">
                Volver a la biblioteca
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

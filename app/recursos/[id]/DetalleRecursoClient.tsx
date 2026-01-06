"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RecursoPDFSerializado } from "@/types/firebase-types";

export default function DetalleRecursoClient({
  recurso,
}: {
  recurso: RecursoPDFSerializado;
}) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (recurso.precio === 0) {
        const response = await fetch("/api/deliver-resource", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            recursoTitulo: recurso.titulo,
            urlArchivo: recurso.urlArchivo,
          }),
        });

        if (response.ok) {
          setSuccess(true);
        } else {
          setError("Error al enviar el material. Reintente por favor.");
        }
      } else {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resourceId: recurso.id,
            email,
          }),
        });

        const data = await response.json();
        if (data.init_point) {
          window.location.href = data.init_point;
        } else {
          setError("No pudimos generar el link de pago.");
        }
      }
    } catch {
      setError("No pudimos conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="py-20 px-4 bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <Link
          href="/recursos"
          className="inline-flex items-center gap-2 text-texto-secundario hover:text-primario-cerebro transition-colors mb-12 font-medium"
        >
          <span>&larr;</span> Volver a la biblioteca
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="relative aspect-3/4 rounded-3xl overflow-hidden shadow-2xl bg-fondo">
            <Image
              src={recurso.urlImagen}
              alt={recurso.titulo}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {recurso.categorias.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs font-bold uppercase tracking-widest text-secundario-corazon bg-secundario-corazon/5 px-3 py-1 rounded-full border border-secundario-corazon/10"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-5xl font-black text-primario-cerebro uppercase tracking-tighter leading-[0.9]">
                {recurso.titulo}
              </h1>
              <div className="text-3xl font-black text-secundario-corazon mt-4">
                {recurso.precio === 0 ? "GRATIS_" : `$${recurso.precio}`}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-black text-lg text-primario-cerebro uppercase tracking-widest">
                Descripción
              </h3>
              <p className="text-texto-principal opacity-80 leading-relaxed text-lg border-l-4 border-anillo-claro/20 pl-6">
                {recurso.descripcion}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-black text-lg text-primario-cerebro uppercase tracking-widest">
                Público objetivo
              </h3>
              <div className="flex flex-wrap gap-3">
                {recurso.publico.map((p) => (
                  <span
                    key={p}
                    className="px-4 py-2 bg-fondo text-primario-cerebro text-[10px] font-black uppercase tracking-widest rounded-xl border border-anillo-claro/10"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-anillo-claro/20">
              {success ? (
                <div className="bg-primario-cerebro/5 border-2 border-primario-cerebro p-8 rounded-3xl animate-in fade-in zoom-in-95 duration-500">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-primario-cerebro text-fondo rounded-full flex items-center justify-center text-2xl font-black">
                      ✓
                    </div>
                    <h4 className="text-2xl font-black text-primario-cerebro uppercase">
                      ¡Enviado!
                    </h4>
                    <p className="text-texto-secundario font-medium italic">
                      Revisá tu bandeja de entrada (`{email}`)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {!showEmailForm ? (
                    <button
                      onClick={() => setShowEmailForm(true)}
                      className="w-full bg-primario-cerebro text-fondo py-6 rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-anillo-oscuro hover:-translate-y-1 transition-all shadow-xl"
                    >
                      {recurso.precio === 0
                        ? "Obtener Material_"
                        : "Comprar ahora_"}
                    </button>
                  ) : (
                    <div className="flex flex-col gap-6 p-8 bg-fondo rounded-[40px] border-2 border-primario-cerebro/5 animate-in slide-in-from-bottom-4 duration-500">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
                          ¿A qué email te lo mandamos?
                        </label>
                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col gap-4"
                        >
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            className="w-full bg-white border-2 border-anillo-claro/20 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro transition-all font-bold"
                          />
                          <button
                            disabled={loading}
                            className="w-full bg-secundario-corazon text-fondo py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-sombra-corazon transition-all disabled:opacity-50"
                          >
                            {loading
                              ? "Procesando..."
                              : recurso.precio === 0
                              ? "Confirmar y Descargar_"
                              : "Ir a pagar_"}
                          </button>
                        </form>
                      </div>
                      {error && (
                        <p className="text-red-500 text-xs font-bold uppercase italic">
                          {error}
                        </p>
                      )}
                    </div>
                  )}
                  <p className="text-center text-[10px] font-black text-texto-secundario uppercase tracking-widest">
                    Formato PDF • Entrega por correo inmediata
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

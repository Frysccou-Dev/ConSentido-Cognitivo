import Image from "next/image";
import { RecursoPDFSerializado } from "@/types/firebase-types";
import { useState } from "react";

interface ResourceCardProps {
  recurso: RecursoPDFSerializado;
}

export default function ResourceCard({ recurso }: ResourceCardProps) {
  const [loading, setLoading] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");

  const handleAction = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!email) {
      setShowEmailInput(true);
      return;
    }

    setLoading(true);
    try {
      if (recurso.precio === 0) {
        const res = await fetch("/api/deliver-resource", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            recursoTitulo: recurso.titulo,
            urlArchivo: recurso.urlArchivo,
          }),
        });
        if (res.ok)
          alert("¡Te enviamos el material por mail! Revisá tu casilla.");
      } else {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resourceId: recurso.id,
            email: email,
          }),
        });
        const data = await res.json();
        if (data.init_point) {
          window.location.href = data.init_point;
        }
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group bg-white rounded-tr-[100px] rounded-bl-[100px] border-2 border-primario-cerebro/10 p-1 flex flex-col h-full shadow-[20px_20px_0px_0px_rgba(75,103,62,0.05)]">
      <div className="relative aspect-square overflow-hidden rounded-tr-[90px] rounded-bl-[60px] bg-fondo m-2">
        <Image
          src={recurso.urlImagen}
          alt={recurso.titulo}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-primario-cerebro/10 mix-blend-multiply"></div>
      </div>

      <div className="p-8 flex flex-col grow gap-6 relative">
        <div className="absolute -top-12 -left-4 w-24 h-24 bg-secundario-corazon rounded-full flex items-center justify-center shadow-xl border-4 border-white rotate-12">
          <span className="text-white font-black text-xl tracking-tighter">
            {recurso.precio === 0 ? "FREE" : `$${recurso.precio}`}
          </span>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-wrap gap-1">
            {recurso.categorias.map((cat) => (
              <span
                key={cat}
                className="text-[9px] font-black uppercase tracking-[0.2em] text-primario-cerebro/40 italic"
              >
                {cat}
              </span>
            ))}
          </div>

          <h3 className="text-2xl font-black text-primario-cerebro leading-none uppercase tracking-tighter wrap-break-word">
            {recurso.titulo}
          </h3>

          <div className="w-12 h-1.5 bg-secundario-corazon mb-2"></div>

          <p className="text-texto-principal text-sm leading-relaxed font-medium opacity-80 border-l-2 border-anillo-claro/30 pl-4 py-1">
            {recurso.descripcion}
          </p>
        </div>

        <div className="mt-auto pt-6 flex flex-col gap-4">
          {showEmailInput ? (
            <form
              onSubmit={handleAction}
              className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2"
            >
              <input
                type="email"
                required
                placeholder="Ingresá tu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-fondo/50 border-2 border-anillo-claro/10 rounded-xl px-4 py-3 outline-none focus:border-primario-cerebro font-bold text-sm"
              />
              <button
                disabled={loading}
                className="w-full bg-primario-cerebro text-white font-black uppercase tracking-widest py-3 rounded-lg hover:bg-anillo-oscuro transition-all disabled:opacity-50 text-xs"
              >
                {loading ? "Procesando..." : "Confirmar_"}
              </button>
              <button
                type="button"
                onClick={() => setShowEmailInput(false)}
                className="text-[10px] font-bold text-primario-cerebro/40 uppercase tracking-widest hover:text-primario-cerebro"
              >
                Cancelar
              </button>
            </form>
          ) : (
            <button
              onClick={() => handleAction()}
              disabled={loading}
              className="group/btn relative inline-flex items-center justify-center px-8 py-4 font-black text-primario-cerebro uppercase tracking-widest overflow-hidden border-2 border-primario-cerebro transition-all duration-300 rounded-lg hover:text-white disabled:opacity-50"
            >
              <span className="absolute inset-0 w-0 bg-primario-cerebro transition-all duration-300 ease-out group-hover/btn:w-full"></span>
              <span className="relative">
                {loading ? "Cargando..." : "Obtener Material_"}
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="absolute -z-10 -bottom-3 -right-3 w-full h-full border-2 border-anillo-claro/20 rounded-tr-[100px] rounded-bl-[100px]"></div>
    </div>
  );
}

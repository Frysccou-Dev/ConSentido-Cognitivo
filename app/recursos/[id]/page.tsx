import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockRecursos } from "@/lib/data/mock-recursos";
import { UUID } from "@/types/firebase-types";

export function generateStaticParams() {
  return mockRecursos.map((recurso) => ({
    id: recurso.id,
  }));
}

export default async function DetalleRecursoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recurso = mockRecursos.find((r) => r.id === id);

  if (!recurso) {
    notFound();
  }

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
              <h1 className="text-title text-primario-cerebro">
                {recurso.titulo}
              </h1>
              <div className="text-2xl font-bold text-primario-cerebro mt-2">
                {recurso.precio === 0 ? "GRATIS" : `$${recurso.precio}`}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-lg text-primario-cerebro">
                Descripción
              </h3>
              <p className="text-texto-principal opacity-90 leading-relaxed text-lg">
                {recurso.descripcion}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-lg text-primario-cerebro">
                Público objetivo
              </h3>
              <div className="flex flex-wrap gap-4">
                {recurso.publico.map((p) => (
                  <div
                    key={p}
                    className="flex items-center gap-2 text-texto-secundario font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secundario-corazon"></span>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-anillo-claro/20">
              <button className="w-full bg-primario-cerebro text-fondo py-5 rounded-2xl font-bold text-xl hover:bg-anillo-oscuro hover:scale-[1.02] transition-all shadow-lg hover:shadow-primario-cerebro/20">
                {recurso.precio === 0 ? "Descargar ahora" : "Añadir al carrito"}
              </button>
              <p className="text-center text-xs text-texto-secundario mt-4">
                Formato PDF • Entrega inmediata
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

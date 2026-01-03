import ResourceCard from "@/components/recursos/ResourceCard";
import { mockRecursos } from "@/lib/data/mock-recursos";

export default function RecursosPage() {
  return (
    <main className="py-20 px-4 bg-fondo/30 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-secundario-corazon font-bold tracking-widest uppercase text-sm">
              Biblioteca Digital
            </span>
            <h1 className="text-title text-primario-cerebro mt-2">
              Materiales descargables
            </h1>
            <p className="text-texto-secundario text-lg mt-4">
              Recursos en formato PDF diseñados profesionalmente para acompañar
              el entrenamiento cognitivo diario.
            </p>
          </div>
          <div className="flex gap-2 bg-white p-1 rounded-2xl border border-anillo-claro/20">
            <button className="px-6 py-2 rounded-xl bg-primario-cerebro text-fondo font-bold text-sm shadow-sm">
              Todos
            </button>
            <button className="px-6 py-2 rounded-xl text-texto-secundario font-bold text-sm hover:bg-fondo transition-colors">
              Gratis
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockRecursos.map((recurso) => (
            <ResourceCard key={recurso.id} recurso={recurso} />
          ))}
        </div>
      </div>
    </main>
  );
}

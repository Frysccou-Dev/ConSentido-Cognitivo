import ResourceCard from "@/components/recursos/ResourceCard";
export const dynamic = "force-dynamic";
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { RecursoPDFSerializado } from "@/types/firebase-types";

export default async function RecursosPage() {
  const q = query(collection(db, "recursos"), orderBy("fechaCreacion", "desc"));
  const snapshot = await getDocs(q);
  const recursos = snapshot.docs
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        fechaCreacion: {
          seconds: data.fechaCreacion?.seconds || 0,
          nanoseconds: data.fechaCreacion?.nanoseconds || 0,
        },
      } as RecursoPDFSerializado;
    })
    .filter((recurso) => recurso.activo === true);

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
          {recursos.length === 0 ? (
            <div className="col-span-full text-center py-20 font-black text-primario-cerebro/10 text-4xl uppercase">
              Próximamente materiales_
            </div>
          ) : (
            recursos.map((recurso) => (
              <ResourceCard key={recurso.id} recurso={recurso} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}

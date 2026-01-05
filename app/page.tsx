import Link from "next/link";
import Hero from "@/components/home/Hero";
import Offerings from "@/components/home/Offerings";
import Functions from "@/components/home/Functions";
import Modalities from "@/components/home/Modalities";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Offerings />
      <Functions />
      <Modalities />

      <section className="bg-primario-cerebro text-fondo py-16 px-4">
        <div className="container mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="text-title text-fondo">¿Tenés alguna duda?</h2>
          <p className="max-w-xl opacity-90">
            Estamos para acompañarte. Consultanos por talleres personalizados o
            materiales específicos según tus necesidades.
          </p>
          <Link href="/contacto">
            <button className="bg-secundario-corazon text-fondo px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg mt-4">
              Ponete en contacto
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

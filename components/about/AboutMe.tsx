import Image from "next/image";

export default function AboutMe() {
  return (
    <section className="py-20 lg:py-32 px-4 bg-fondo overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl skew-y-1">
              <div className="absolute inset-0 bg-primario-cerebro/10 animate-pulse"></div>
              <Image
                src="/Hero.jpeg"
                alt="Psicopedagoga - ConSentido Cognitivo"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secundario-corazon/10 rounded-full blur-3xl -z-10"></div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-secundario-corazon font-bold tracking-widest uppercase text-sm">
                Mi vocación
              </span>
              <h1 className="text-title text-primario-cerebro">Sobre mí</h1>
            </div>

            <div className="flex flex-col gap-6 text-lg text-texto-principal leading-relaxed opacity-90">
              <p>
                Soy profesional con <strong>formación psicopedagógica</strong>,
                dedicada apasionadamente a la estimulación neurocognitiva de
                adultos mayores. Mi mirada sobre el envejecimiento se basa en el
                respeto, la escucha y el acompañamiento constante.
              </p>
              <p>
                Creo firmemente que el aprendizaje y el ejercicio mental no
                terminan en una etapa de la vida. Para mí, la estimulación
                cognitiva es un proceso{" "}
                <strong>humano, vincular y respetuoso</strong>.
              </p>
              <blockquote className="border-l-4 border-secundario-corazon pl-6 py-2 italic text-primario-cerebro font-medium bg-white/50 rounded-r-xl">
                &quot;Creemos en la estimulación cognitiva como un proceso donde
                aprender y ejercitar también es encontrarse con otros.&quot;
              </blockquote>
              <p>
                Priorizo los talleres por sobre el uso exclusivo de material
                descargable porque entiendo que el{" "}
                <strong>vínculo humano</strong> potencia cualquier actividad. El
                encuentro con otros es lo que le da verdadero sentido a nuestra
                propuesta.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-white p-6 rounded-2xl border border-anillo-claro/20 shadow-sm">
                <h3 className="text-primario-cerebro font-bold mb-2">
                  Formación
                </h3>
                <p className="text-sm text-texto-secundario">
                  Especialización en gerontología y neuropsicología aplicada.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-anillo-claro/20 shadow-sm">
                <h3 className="text-primario-cerebro font-bold mb-2">
                  Enfoque
                </h3>
                <p className="text-sm text-texto-secundario">
                  Envejecimiento activo, preventivo y de acompañamiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

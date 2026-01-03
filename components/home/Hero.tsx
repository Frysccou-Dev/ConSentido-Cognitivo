import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-fondo py-20 lg:py-32 px-4">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-anillo-claro/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-secundario-corazon/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primario-cerebro/5 border border-primario-cerebro/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-primario-cerebro animate-pulse"></span>
              <span className="text-primario-cerebro text-sm font-bold uppercase tracking-wider">
                Profesional & Humano
              </span>
            </div>

            <h1 className="text-title text-primario-cerebro leading-[1.1]">
              Estimulación neurocognitiva <br className="hidden md:block" />
              <span className="text-secundario-corazon">
                para adultos mayores
              </span>
            </h1>

            <p className="text-subtitle text-texto-principal max-w-xl opacity-90 leading-relaxed">
              Recursos y talleres pensados para acompañar el envejecimiento
              activo, con actividades claras, graduales y significativas que
              potencian la autonomía.
            </p>

            <div className="flex flex-wrap gap-5 mt-4">
              <button className="bg-primario-cerebro text-fondo px-10 py-4 rounded-full font-bold hover:bg-anillo-oscuro hover:-translate-y-1 transition-all shadow-lg hover:shadow-primario-cerebro/20">
                Ver recursos PDF
              </button>
              <button className="border-2 border-secundario-corazon text-secundario-corazon px-10 py-4 rounded-full font-bold hover:bg-secundario-corazon hover:text-fondo hover:-translate-y-1 transition-all">
                Conocer talleres
              </button>
            </div>

            <div className="flex items-center gap-8 mt-8 border-t border-anillo-claro/30 pt-8">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primario-cerebro">
                  +100
                </span>
                <span className="text-sm text-texto-secundario font-medium">
                  Recursos subidos
                </span>
              </div>
              <div className="w-px h-10 bg-anillo-claro/30"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primario-cerebro">
                  Individual
                </span>
                <span className="text-sm text-texto-secundario font-medium">
                  & Grupal
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/ConSentido_Logo.jpeg"
                alt="ConSentido Logo Hero"
                fill
                className="object-cover scale-110"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl -rotate-6 hidden md:block border border-anillo-claro/20 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-secundario-corazon"></div>
              <p className="text-primario-cerebro font-bold text-lg mb-1 italic">
                "Neuroplasticidad"
              </p>
              <p className="text-texto-secundario text-xs font-medium">
                Aprender siempre es posible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

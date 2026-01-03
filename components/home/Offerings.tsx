export default function Offerings() {
  return (
    <section className="bg-white py-24 md:py-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-title text-primario-cerebro mb-4">
            Propuestas de acompañamiento
          </h2>
          <p className="text-texto-secundario text-lg max-w-2xl mx-auto">
            Dos líneas de trabajo complementarias para potenciar la salud
            cognitiva en diferentes entornos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="group relative bg-[#fdfaf5] p-10 md:p-12 rounded-3xl border border-anillo-claro/20 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg
                className="w-24 h-24 text-primario-cerebro"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            </div>

            <div className="relative z-10">
              <span className="inline-block px-4 py-1 rounded-full bg-primario-cerebro/10 text-primario-cerebro text-sm font-bold mb-6">
                PDF + Imprimibles
              </span>
              <h3 className="text-subtitle text-primario-cerebro mb-6">
                Recursos descargables
              </h3>
              <ul className="flex flex-col gap-4 text-texto-principal mb-10">
                {[
                  "Materiales listos para imprimir y usar.",
                  "Organizados por función cognitiva.",
                  "Versatilidad: uso individual o grupal.",
                  "Ideal para hogar, consulta o instituciones.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secundario-corazon shrink-0"></span>
                    <span className="opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-primario-cerebro text-fondo px-8 py-3 rounded-full font-bold hover:bg-anillo-oscuro transition-all shadow-md group-hover:shadow-lg">
                Ir a la tienda
              </button>
            </div>
          </div>

          <div className="group relative bg-[#fff9f2] p-10 md:p-12 rounded-3xl border border-secundario-corazon/10 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg
                className="w-24 h-24 text-secundario-corazon"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>

            <div className="relative z-10">
              <span className="inline-block px-4 py-1 rounded-full bg-secundario-corazon/10 text-secundario-corazon text-sm font-bold mb-6">
                Guiados + Presenciales
              </span>
              <h3 className="text-subtitle text-primario-cerebro mb-6">
                Talleres cognitivos
              </h3>
              <ul className="flex flex-col gap-4 text-texto-principal mb-10">
                {[
                  "Encuentros guiados con supervisión.",
                  "Modalidad grupal o individual.",
                  "Actividades adaptadas a cada nivel.",
                  "Acompañamiento vincular y humano.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secundario-corazon shrink-0"></span>
                    <span className="opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-secundario-corazon text-fondo px-8 py-3 rounded-full font-bold hover:bg-sombra-corazon transition-all shadow-md group-hover:shadow-lg">
                Saber más
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Functions() {
  const functions = [
    {
      name: "Memoria",
      desc: "Ejercicios para fortalecer la retención y recuperación de información.",
    },
    {
      name: "Atención",
      desc: "Actividades de concentración, foco y discriminación visual.",
    },
    {
      name: "Lenguaje",
      desc: "Estimulación de la fluidez verbal, comprensión y vocabulario.",
    },
    {
      name: "Funciones ejecutivas",
      desc: "Planificación, razonamiento y toma de decisiones.",
    },
    {
      name: "Orientación",
      desc: "Prácticas de ubicación espacial, temporal y personal.",
    },
    {
      name: "Habilidades visoespaciales",
      desc: "Reconocimiento de formas, distancias y praxias.",
    },
  ];

  return (
    <section className="bg-fondo py-24 md:py-32 px-4 shadow-inner">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <h2 className="text-title text-primario-cerebro mb-6">
              Qué se trabaja
            </h2>
            <p className="text-texto-principal text-lg opacity-80">
              Cada actividad está diseñada para estimular áreas específicas del
              cerebro, fomentando la neuroplasticidad y el bienestar diario.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-1 bg-secundario-corazon rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {functions.map((func) => (
            <div
              key={func.name}
              className="group bg-white p-8 rounded-2xl border-b-4 border-transparent hover:border-secundario-corazon transition-all shadow-sm hover:shadow-md h-full"
            >
              <h4 className="text-xl font-bold text-primario-cerebro mb-3 group-hover:text-secundario-corazon transition-colors">
                {func.name}
              </h4>
              <p className="text-texto-secundario leading-relaxed">
                {func.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

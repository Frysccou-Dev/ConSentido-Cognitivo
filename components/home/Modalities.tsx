export default function Modalities() {
  const modalities = [
    {
      title: "Taller grupal",
      details: [
        "Dirigido a adultos mayores.",
        "Encuentros semanales.",
        "Grupos reducidos.",
        "Duración: 60 a 90 minutos.",
      ],
    },
    {
      title: "Taller individual",
      details: [
        "Acompañamiento personalizado.",
        "Ritmo de trabajo propio.",
        "Objetivos específicos.",
        "Enfoque centrado en la persona.",
      ],
    },
    {
      title: "Taller institucional",
      details: [
        "Propuestas para centros de día.",
        "Hogares y residencias.",
        "Espacios comunitarios.",
        "Adaptable a cada institución.",
      ],
    },
  ];

  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-title mb-6">¿Qué son los talleres?</h2>
          <p className="text-body text-texto-principal">
            Son espacios de encuentro y trabajo donde, a través de actividades
            significativas, se estimula la mente respetando los tiempos e
            intereses de cada persona. Creemos en la estimulación cognitiva como
            un proceso humano y vincular.
          </p>
        </div>

        <h3 className="text-subtitle text-center mb-12">
          Modalidades de trabajo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modalities.map((mod) => (
            <div
              key={mod.title}
              className="border-l-4 border-secundario-corazon pl-6 py-2"
            >
              <h4 className="text-header font-bold text-primario-cerebro mb-4">
                {mod.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {mod.details.map((detail, idx) => (
                  <li key={idx} className="text-texto-secundario text-sm">
                    • {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

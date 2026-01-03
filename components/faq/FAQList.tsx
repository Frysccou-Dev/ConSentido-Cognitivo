"use client";

import { useState } from "react";

const faqs = [
  {
    question: "¿Hace falta diagnóstico para participar?",
    answer:
      "No, no es necesario un diagnóstico previo. Los talleres están abiertos a todas las personas mayores que deseen ejercitar su mente, socializar y participar de una propuesta de envejecimiento activo.",
  },
  {
    question: "¿Qué sucede si una persona tiene DCL?",
    answer:
      "Nuestra propuesta contempla diferentes niveles de trabajo. En casos de Deterioro Cognitivo Leve, adaptamos las actividades para que resulten significativas y acordes a las capacidades de la persona, brindando el apoyo necesario.",
  },
  {
    question: "¿Los talleres son evaluativos?",
    answer:
      "No, bajo ningún punto de vista. El objetivo es la estimulación y el bienestar, no la evaluación del desempeño. Buscamos crear un ambiente relajado y de confianza donde cada uno trabaje a su ritmo.",
  },
  {
    question: "¿Cuántas personas participan por grupo?",
    answer:
      "Priorizamos los grupos reducidos para garantizar un acompañamiento personalizado y una dinámica vincular fluida. Generalmente, los grupos tienen entre 7 y 10 participantes.",
  },
  {
    question: "¿Se pueden contratar talleres para una institución?",
    answer:
      "Sí, contamos con modalidades institucionales adaptadas para centros de día, hogares o espacios comunitarios, diseñando el plan de trabajo en conjunto con la coordinación del lugar.",
  },
];

export default function FAQList() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-32 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
          <div className="lg:w-1/3 flex flex-col gap-4 lg:sticky lg:top-32">
            <span className="text-secundario-corazon font-bold tracking-widest uppercase text-xs">
              Centro de ayuda
            </span>
            <h1 className="text-4xl font-bold text-primario-cerebro leading-tight">
              Preguntas frecuentes
            </h1>
            <p className="text-texto-secundario">
              Despejá tus dudas sobre nuestra forma de trabajar y propuestas.
            </p>
            <div className="w-12 h-1 bg-secundario-corazon/30 rounded-full mt-2"></div>
          </div>

          <div className="lg:w-2/3 flex flex-col gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`transition-all duration-300 rounded-3xl overflow-hidden ${
                  activeIndex === index
                    ? "bg-white shadow-xl ring-1 ring-black/5"
                    : "bg-transparent hover:bg-white/40"
                }`}
              >
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full flex items-center gap-6 p-8 text-left group"
                >
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      activeIndex === index
                        ? "bg-primario-cerebro border-primario-cerebro text-white"
                        : "border-anillo-claro text-primario-cerebro group-hover:border-primario-cerebro"
                    }`}
                  >
                    {activeIndex === index ? (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`font-bold text-lg transition-colors duration-300 ${
                      activeIndex === index
                        ? "text-primario-cerebro"
                        : "text-texto-principal opacity-80"
                    }`}
                  >
                    {faq.question}
                  </span>
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out ${
                    activeIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-8 pt-0 pl-22 text-texto-secundario leading-relaxed italic border-l-2 border-secundario-corazon/20 ml-12 mb-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

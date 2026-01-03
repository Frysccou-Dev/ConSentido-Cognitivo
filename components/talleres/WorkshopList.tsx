"use client";

import { Taller, UUID } from "@/types/firebase-types";

const mockTalleres: Taller[] = [
  {
    id: "taller-01" as UUID,
    titulo: "Encuentros Grupales",
    descripcion:
      "Espacios de socialización y desafío cognitivo. Trabajamos en grupos reducidos para potenciar el vínculo y el aprendizaje compartido.",
    modalidad: "Grupal",
    frecuencia: "Semanal",
    duracion: "60 a 90 minutos",
    objetivos: ["Memoria", "Atención", "Lenguaje", "Socialización"],
    activo: true,
  },
  {
    id: "taller-02" as UUID,
    titulo: "Acompañamiento Individual",
    descripcion:
      "Sesiones personalizadas diseñadas exclusivamente para las necesidades y ritmos propios de cada persona.",
    modalidad: "Individual",
    frecuencia: "A convenir",
    duracion: "60 minutos",
    objetivos: ["Orientación", "Funciones Ejecutivas", "Praxias"],
    activo: true,
  },
  {
    id: "taller-03" as UUID,
    titulo: "Propuesta Institucional",
    descripcion:
      "Programas diseñados para centros de día y residencias, adaptando la metodología a la dinámica de cada institución.",
    modalidad: "Institucional",
    frecuencia: "Plan mensual",
    duracion: "Variable",
    objetivos: ["Prevención", "Mantenimiento", "Asesoramiento"],
    activo: true,
  },
];

export default function WorkshopList() {
  return (
    <section className="py-20 lg:py-32 px-4 bg-fondo/30">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 mb-20">
          <span className="text-secundario-corazon font-black uppercase tracking-[0.3em] text-xs">
            Propuestas Presenciales
          </span>
          <h1 className="text-5xl font-black text-primario-cerebro uppercase tracking-tighter leading-none">
            Talleres de <br />{" "}
            <span className="text-secundario-corazon">Estimulación_</span>
          </h1>
          <p className="text-xl text-texto-secundario max-w-2xl mt-4">
            Espacios diseñados para potenciar la mente a través de actividades
            significativas y un fuerte enfoque vincular.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {mockTalleres.map((taller) => (
            <div
              key={taller.id}
              className="relative bg-white p-10 rounded-[50px] border-2 border-primario-cerebro/5 flex flex-col gap-8 shadow-sm hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="absolute top-8 right-8 text-[10px] font-black uppercase tracking-widest text-secundario-corazon/40 group-hover:text-secundario-corazon transition-colors">
                {taller.modalidad}
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-3xl font-black text-primario-cerebro leading-tight uppercase tracking-tighter">
                  {taller.titulo}
                </h3>
                <div className="w-12 h-1 bg-secundario-corazon"></div>
              </div>

              <p className="text-texto-principal font-medium opacity-80 leading-relaxed">
                {taller.descripcion}
              </p>

              <div className="flex flex-wrap gap-2">
                {taller.objetivos.map((obj) => (
                  <span
                    key={obj}
                    className="px-3 py-1 bg-fondo text-primario-cerebro text-[10px] font-black uppercase tracking-widest rounded-full border border-anillo-claro/20"
                  >
                    {obj}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-anillo-claro/10 flex flex-col gap-4">
                <div className="flex justify-between items-center text-sm font-bold text-texto-secundario">
                  <span>Frecuencia:</span>
                  <span className="text-primario-cerebro">
                    {taller.frecuencia}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-texto-secundario">
                  <span>Duración:</span>
                  <span className="text-primario-cerebro">
                    {taller.duracion}
                  </span>
                </div>
                <button className="w-full bg-primario-cerebro text-white font-black uppercase tracking-widest py-4 rounded-3xl mt-4 hover:bg-anillo-oscuro transition-all">
                  Consultar Cupos_
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

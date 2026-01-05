"use client";

import { useState } from "react";
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
  const [selectedTaller, setSelectedTaller] = useState<Taller | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConsultar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaller) return;
    setLoading(true);

    try {
      const response = await fetch("/api/workshop-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          taller: selectedTaller.titulo,
          modalidad: selectedTaller.modalidad,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setSelectedTaller(null);
          setFormData({ nombre: "", email: "", mensaje: "" });
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 lg:py-32 px-4 bg-fondo/30 relative min-h-screen">
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
                <button
                  onClick={() => setSelectedTaller(taller)}
                  className="w-full bg-primario-cerebro text-white font-black uppercase tracking-widest py-4 rounded-3xl mt-4 hover:bg-anillo-oscuro transition-all focus:scale-95 active:scale-95"
                >
                  Consultar Cupos_
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTaller && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-primario-cerebro/40 backdrop-blur-md animate-in fade-in duration-300">
          <div
            className="bg-white w-full max-w-lg rounded-[40px] p-8 lg:p-12 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTaller(null)}
              className="absolute top-8 right-8 text-primario-cerebro/40 hover:text-primario-cerebro transition-colors text-2xl"
            >
              ✕
            </button>

            {success ? (
              <div className="flex flex-col items-center justify-center gap-6 py-10 text-center">
                <div className="w-20 h-20 bg-primario-cerebro text-white rounded-full flex items-center justify-center text-4xl">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-primario-cerebro uppercase">
                  Consulta Enviada
                </h3>
                <p className="text-texto-secundario">
                  Recibimos tu interés por <br />{" "}
                  <span className="font-bold text-primario-cerebro">
                    {selectedTaller.titulo}
                  </span>
                  .
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-secundario-corazon font-black uppercase tracking-widest text-[10px]">
                    Consultar por taller
                  </span>
                  <h2 className="text-3xl font-black text-primario-cerebro uppercase tracking-tighter leading-none">
                    {selectedTaller.titulo}
                  </h2>
                </div>

                <form
                  onSubmit={handleConsultar}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
                      Tu Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      placeholder="Nombre completo"
                      className="w-full bg-fondo/50 border-2 border-anillo-claro/10 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro transition-all font-medium text-texto-principal"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
                      Email Especial
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="tu@email.com"
                      className="w-full bg-fondo/50 border-2 border-anillo-claro/10 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro transition-all font-medium text-texto-principal"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
                      Consulta o duda
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.mensaje}
                      onChange={(e) =>
                        setFormData({ ...formData, mensaje: e.target.value })
                      }
                      placeholder="¿En qué podemos ayudarte?"
                      className="w-full bg-fondo/50 border-2 border-anillo-claro/10 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro transition-all font-medium text-texto-principal resize-none"
                    ></textarea>
                  </div>

                  <button
                    disabled={loading}
                    className="bg-primario-cerebro text-white font-black uppercase tracking-widest py-5 rounded-3xl shadow-xl hover:bg-anillo-oscuro transition-all disabled:opacity-50"
                  >
                    {loading ? "Enviando..." : "Enviar Consulta_"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

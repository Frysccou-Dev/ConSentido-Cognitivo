"use client";

export default function ContactForm() {
  return (
    <section className="py-20 lg:py-32 px-4 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-primario-cerebro/10"></div>

      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-secundario-corazon font-black uppercase tracking-[0.3em] text-xs">
                Consulta Directa
              </span>
              <h1 className="text-5xl font-black text-primario-cerebro uppercase tracking-tighter leading-none">
                Caminemos <br />{" "}
                <span className="text-secundario-corazon">Juntos_</span>
              </h1>
            </div>

            <p className="text-xl text-texto-principal opacity-80 leading-relaxed border-l-4 border-anillo-claro/30 pl-6">
              ¿Tenés dudas sobre los talleres o necesitás asesoramiento sobre
              los materiales? Escribinos y te responderemos a la brevedad.
            </p>

            <div className="flex flex-col gap-6 mt-4">
              <div className="group flex items-center gap-4">
                <div className="w-12 h-12 bg-fondo rounded-full flex items-center justify-center text-primario-cerebro border border-anillo-claro/20 group-hover:bg-primario-cerebro group-hover:text-white transition-all">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-texto-secundario">
                    Email
                  </p>
                  <p className="text-lg font-bold text-primario-cerebro">
                    hola@consentidocognitivo.com
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-4">
                <div className="w-12 h-12 bg-fondo rounded-full flex items-center justify-center text-primario-cerebro border border-anillo-claro/20 group-hover:bg-primario-cerebro group-hover:text-white transition-all">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-texto-secundario">
                    Ubicación
                  </p>
                  <p className="text-lg font-bold text-primario-cerebro">
                    Buenos Aires, Argentina
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-fondo p-10 lg:p-12 rounded-[40px] border-2 border-primario-cerebro/5 shadow-2xl relative">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-secundario-corazon/20 rounded-full blur-2xl"></div>

            <form
              className="flex flex-col gap-6 relative z-10"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Escribí tu nombre..."
                  className="w-full bg-white border-2 border-anillo-claro/20 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro transition-all font-medium"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
                  Email de contacto
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full bg-white border-2 border-anillo-claro/20 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro transition-all font-medium"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
                  Interés
                </label>
                <select className="w-full bg-white border-2 border-anillo-claro/20 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro transition-all font-medium appearance-none">
                  <option>Talleres Grupales</option>
                  <option>Talleres Individuales</option>
                  <option>Material Descargable (Recursos)</option>
                  <option>Consulta General</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  placeholder="¿En qué podemos ayudarte?"
                  className="w-full bg-white border-2 border-anillo-claro/20 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro transition-all font-medium resize-none"
                ></textarea>
              </div>

              <button className="bg-primario-cerebro text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-xl hover:bg-anillo-oscuro hover:-translate-y-1 transition-all mt-4">
                Enviar Mensaje_
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

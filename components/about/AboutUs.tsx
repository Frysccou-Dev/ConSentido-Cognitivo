import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="py-20 lg:py-32 px-4 bg-f-8f1e9 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-12 flex flex-col gap-12">
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <span className="text-secundario-corazon font-bold tracking-widest uppercase text-sm">
                Nuestro equipo
              </span>
              <h1 className="text-title text-primario-cerebro">
                Sobre nosotras
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="flex flex-col gap-8">
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl skew-y-1">
                  <Image
                    src="/Hero.jpeg"
                    alt="Equipo ConSentido Cognitivo"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-6 text-lg text-texto-principal leading-relaxed opacity-90">
                  <p>
                    Somos egresadas de{" "}
                    <strong>
                      Psicopedagogía del Instituto Frederic Chopin
                    </strong>
                    , unidas por la vocación de acompañar a los adultos mayores
                    en su proceso de envejecimiento activo. Actualmente,
                    continuamos nuestra formación académica cursando la{" "}
                    <strong>Licenciatura en Psicopedagogía</strong> para
                    profundizar nuestra mirada y herramientas profesionales.
                  </p>
                  <p>
                    Entendemos la estimulación neurocognitiva no solo como un
                    ejercicio mental, sino como un puente vincular que sostiene
                    la autonomía y el bienestar emocional.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-10 bg-white p-10 rounded-3xl shadow-sm border border-anillo-claro/20">
                <div className="flex flex-col gap-6">
                  <h2 className="text-subtitle text-primario-cerebro">
                    Cómo trabajamos
                  </h2>
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-secundario-corazon/10 flex items-center justify-center text-secundario-corazon font-bold">
                        1
                      </div>
                      <p className="text-texto-principal">
                        <strong className="text-primario-cerebro">
                          Mirada Integral:
                        </strong>{" "}
                        Abordamos a la persona desde sus dimensiones cognitivas,
                        emocionales y sociales de forma respetuosa.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-secundario-corazon/10 flex items-center justify-center text-secundario-corazon font-bold">
                        2
                      </div>
                      <p className="text-texto-principal">
                        <strong className="text-primario-cerebro">
                          Vínculo Humano:
                        </strong>{" "}
                        El material es un medio, pero el fin es el encuentro.
                        Priorizamos el taller por sobre el simple ejercicio.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-secundario-corazon/10 flex items-center justify-center text-secundario-corazon font-bold">
                        3
                      </div>
                      <p className="text-texto-principal">
                        <strong className="text-primario-cerebro">
                          Propuestas Significativas:
                        </strong>{" "}
                        Actividades graduadas y claras, pensadas para que tengan
                        sentido en el día a día del adulto mayor.
                      </p>
                    </div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-secundario-corazon pl-6 py-2 italic text-primario-cerebro font-medium bg-fondo/50 rounded-r-xl">
                  &quot;Nuestra prioridad es que cada persona se sienta
                  escuchada y protagonista de su proceso.&quot;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

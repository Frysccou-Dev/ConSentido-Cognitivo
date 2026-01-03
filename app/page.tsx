export default function Home() {
  return (
    <section className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center gap-8">
      <h1 className="text-title max-w-4xl">
        Acompañando el envejecimiento activo de manera profesional
      </h1>
      <p className="text-subtitle max-w-2xl">
        Recursos y talleres de estimulación neurocognitiva diseñados para
        potenciar el bienestar y la autonomía de los adultos mayores.
      </p>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <button className="bg-primario-cerebro text-fondo px-8 py-3 rounded-full font-bold hover:bg-anillo-oscuro transition-all shadow-md">
          Ver Recursos
        </button>
        <button className="border-2 border-secundario-corazon text-secundario-corazon px-8 py-3 rounded-full font-bold hover:bg-secundario-corazon hover:text-fondo transition-all">
          Conocer Talleres
        </button>
      </div>
    </section>
  );
}

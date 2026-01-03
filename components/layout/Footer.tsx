import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primario-cerebro text-fondo py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/ConSentido_Logo.jpeg"
              alt="ConSentido Logo"
              width={40}
              height={40}
              className="rounded-full brightness-110"
            />
            <span className="text-xl font-bold tracking-tight">
              ConSentido Cognitivo
            </span>
          </div>
          <p className="opacity-90 max-w-xs">
            Estimulación neurocognitiva para adultos mayores. Recursos y
            talleres pensados para acompañar el envejecimiento activo.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-anillo-claro">Explorar</h3>
            <Link
              href="/recursos"
              className="hover:text-secundario-corazon transition-colors"
            >
              Recursos
            </Link>
            <Link
              href="/talleres"
              className="hover:text-secundario-corazon transition-colors"
            >
              Talleres
            </Link>
            <Link
              href="/sobre-mi"
              className="hover:text-secundario-corazon transition-colors"
            >
              Sobre mí
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-anillo-claro">Ayuda</h3>
            <Link
              href="/faq"
              className="hover:text-secundario-corazon transition-colors"
            >
              Preguntas frecuentes
            </Link>
            <Link
              href="/contacto"
              className="hover:text-secundario-corazon transition-colors"
            >
              Contacto
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg text-anillo-claro">Contacto</h3>
          <p className="opacity-90">Buenos Aires, Argentina</p>
          <a
            href="mailto:hola@consentido.com"
            className="hover:text-secundario-corazon transition-colors"
          >
            hola@consentido.com
          </a>
        </div>
      </div>

      <div className="container mx-auto mt-12 pt-8 border-t border-anillo-oscuro/30 text-center opacity-80 text-sm">
        <p>© {currentYear} ConSentido. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

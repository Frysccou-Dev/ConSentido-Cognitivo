import { Timestamp } from "firebase/firestore";
import { RecursoPDF, UUID } from "@/types/firebase-types";

export const mockRecursos: RecursoPDF[] = [
  {
    id: "recurso-test-01" as UUID,
    titulo: "Cuadernillo de Estimulación de Memoria Vol. 1",
    descripcion:
      "Un material exhaustivo diseñado para trabajar la memoria de corto y largo plazo a través de ejercicios visuales y semánticos graduados.",
    precio: 0,
    urlArchivo: "#",
    urlImagen: "/Hero.jpeg",
    categorias: ["Memoria", "Atención"],
    publico: ["Hogar", "Consultorio"],
    fechaCreacion: Timestamp.now(),
  },
];

import { Timestamp } from "firebase/firestore";

/** Formato UUID para identificadores únicos */
export type UUID = string;

/**
 * Representa un recurso descargable en formato PDF
 */
export interface RecursoPDF {
  id: UUID;
  titulo: string;
  descripcion: string;
  precio: number;
  urlArchivo: string; // Link de Firebase Storage al PDF
  urlImagen: string; // Imagen de portada para la tienda
  /** Funciones cognitivas que estimula este material */
  categorias: string[];
  /** A quién está dirigido el material */
  publico: ("Hogar" | "Consultorio" | "Institución")[];
  activo: boolean; // Para mostrar o no el recurso en la web
  fechaCreacion: Timestamp;
}

/** Versión serializable para Client Components */
export interface RecursoPDFSerializado
  extends Omit<RecursoPDF, "fechaCreacion"> {
  fechaCreacion: {
    seconds: number;
    nanoseconds: number;
  };
}

/**
 * Define la estructura de los Talleres de estimulación
 */
export interface Taller {
  id: UUID;
  titulo: string;
  descripcion: string;
  modalidad: "Grupal" | "Individual" | "Institucional";
  frecuencia: string; // Ejemplo: "Semanal"
  duracion: string; // Ejemplo: "60 a 90 minutos"
  objetivos: string[]; // Lista de puntos clave de lo que se trabaja
  activo: boolean; // Para mostrar o no el taller en la web
}

/**
 * Consultas recibidas a través del formulario de contacto
 */
export interface MensajeContacto {
  id: UUID;
  nombre: string;
  email: string;
  mensaje: string;
  /** Área por la que se está consultando */
  interes: "Recursos" | "Talleres" | "General";
  fecha: Timestamp;
  leido: boolean;
}

/**
 * Preguntas frecuentes (FAQ) para la sección de ayuda
 */
export interface PreguntaFrecuente {
  id: UUID;
  pregunta: string;
  respuesta: string;
  orden: number; // Para controlar la posición en la lista
}

/**
 * Perfil de la profesional (Sección Sobre Mí)
 */
export interface PerfilProfesional {
  nombre: string;
  formacion: string;
  biografia: string;
  fotoUrl: string;
  enfoque: string; // Su mirada sobre el envejecimiento
}

/**
 * Usuarios del sistema (Admin o Clientes si se expande)
 */
export interface Usuario {
  id: UUID;
  uid: string; // Firebase Auth UID
  email: string;
  nombre: string;
  rol: "super" | "admin" | "usuario";
  fechaRegistro: Timestamp;
}

/**
 * Gestión de turnos para talleres individuales o grupales
 */
export interface Turno {
  id: UUID;
  tallerId: UUID; // Relación con la colección de Talleres
  participanteNombre: string;
  participanteEmail: string;
  participanteTelefono?: string;
  fechaHora: Timestamp; // Fecha y hora del encuentro
  estado: "pendiente" | "confirmado" | "cancelado" | "realizado";
  notas?: string; // Información relevante para la sesión
}

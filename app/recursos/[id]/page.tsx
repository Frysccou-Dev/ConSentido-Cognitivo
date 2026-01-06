import { notFound } from "next/navigation";
import DetalleRecursoClient from "./DetalleRecursoClient";

export const dynamic = "force-dynamic";
import { db } from "@/lib/firebase/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { RecursoPDFSerializado } from "@/types/firebase-types";

export async function generateStaticParams() {
  const q = query(collection(db, "recursos"), where("activo", "==", true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
  }));
}

export default async function DetalleRecursoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const docRef = doc(db, "recursos", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists() || !docSnap.data().activo) {
    notFound();
  }

  const data = docSnap.data();
  const recursoSerializado: RecursoPDFSerializado = {
    id: docSnap.id,
    ...data,
    fechaCreacion: {
      seconds: data.fechaCreacion?.seconds || 0,
      nanoseconds: data.fechaCreacion?.nanoseconds || 0,
    },
  } as RecursoPDFSerializado;

  return <DetalleRecursoClient recurso={recursoSerializado} />;
}

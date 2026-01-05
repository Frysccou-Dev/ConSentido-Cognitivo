import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("recursos")
      .orderBy("fechaCreacion", "desc")
      .get();
    const recursos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(recursos);
  } catch {
    return NextResponse.json(
      { error: "Error al obtener recursos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const docRef = await adminDb.collection("recursos").add({
      ...data,
      fechaCreacion: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ id: docRef.id });
  } catch {
    return NextResponse.json({ error: "Error al crear" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...data } = await req.json();
    await adminDb.collection("recursos").doc(id).update(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ error: "ID faltante" }, { status: 400 });

    const docRef = adminDb.collection("recursos").doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
      const data = doc.data();
      const urls = [data?.urlImagen, data?.urlArchivo].filter(Boolean);

      for (const url of urls) {
        try {
          const parts = url.split("/");
          const versionIndex = parts.findIndex((p: string) => /^v\d+$/.test(p));
          const publicIdWithExt = parts.slice(versionIndex + 1).join("/");
          const publicId = publicIdWithExt.split(".")[0];
          const isRaw = url.includes("/raw/");

          await cloudinary.uploader.destroy(publicId, {
            resource_type: isRaw ? "raw" : "image",
          });
        } catch (err) {
          console.error("Error al borrar en Cloudinary:", err);
        }
      }
    }

    await docRef.delete();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}

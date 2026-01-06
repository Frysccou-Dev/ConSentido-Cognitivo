import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import cloudinary from "@/lib/cloudinary";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const nombre = formData.get("nombre") as string;
    const email = formData.get("email") as string;
    const total = formData.get("total") as string;
    const items = JSON.parse(formData.get("items") as string);
    const file = formData.get("file") as File;

    if (!nombre || !email || !file || !items.length) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    const uploadRes = await cloudinary.uploader.upload(dataUrl, {
      folder: "consentido/comprobantes",
    });

    const pedido = {
      nombre,
      email,
      total: Number(total),
      recursos: items,
      comprobanteUrl: uploadRes.secure_url,
      publicId: uploadRes.public_id,
      estado: "pendiente",
      fechaCreacion: FieldValue.serverTimestamp(),
    };

    const docRef = await adminDb.collection("pedidos").add(pedido);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "No se pudo procesar el pedido" },
      { status: 500 }
    );
  }
}

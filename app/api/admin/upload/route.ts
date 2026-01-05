import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { adminDb, adminAuth } from "@/lib/firebase/admin";

async function checkAdmin(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;

  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userDoc = await adminDb
      .collection("usuarios")
      .doc(decodedToken.uid)
      .get();
    if (!userDoc.exists) return false;
    const userData = userDoc.data();
    return userData?.rol === "admin" || userData?.rol === "super";
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "consentido/recursos";

    if (!file) {
      return NextResponse.json(
        { error: "No se encontró el archivo" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "auto",
            access_mode: "public",
            type: "upload",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Error en la subida" }, { status: 500 });
  }
}

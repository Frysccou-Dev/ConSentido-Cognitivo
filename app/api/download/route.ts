import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { useUI } from "@/context/UIContext"; // Note: This is client-only, will need to check how to handle this in API

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) return new Response("Token missing", { status: 400 });

    const secret = (process.env.CLOUDINARY_API_SECRET || "").trim();
    const decoded = jwt.verify(token, secret) as {
      publicId: string;
      version?: string;
      extension: string;
      filename: string;
    };

    const cloudName = (process.env.CLOUDINARY_CLOUD_NAME || "").trim();

    const routes = ["image", "raw"];
    let finalRes = null;

    for (const route of routes) {
      const downloadUrl = `https://res.cloudinary.com/${cloudName}/${route}/upload/fl_attachment:${decoded.filename}/v${decoded.version}/${decoded.publicId}.${decoded.extension}`;
      const res = await fetch(downloadUrl);
      if (res.ok) {
        finalRes = res;
        break;
      }
    }

    if (!finalRes) {
      return new Response(
        "No se pudo localizar el archivo. Contacte a soporte.",
        { status: 404 }
      );
    }

    const blob = await finalRes.blob();
    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${decoded.filename}.pdf"`,
      },
    });
  } catch {
    return new Response("Link inválido o expirado", { status: 401 });
  }
}

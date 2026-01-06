import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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

    const downloadUrl = `https://res.cloudinary.com/${cloudName}/raw/upload/fl_attachment:${decoded.filename}/${decoded.publicId}.${decoded.extension}`;

    const res = await fetch(downloadUrl);

    if (!res.ok) {
      return new Response(
        "No se pudo localizar el archivo. Contacte a soporte.",
        { status: 404 }
      );
    }

    const blob = await res.blob();
    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${decoded.filename}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return new Response("Link inválido o expirado", { status: 401 });
  }
}

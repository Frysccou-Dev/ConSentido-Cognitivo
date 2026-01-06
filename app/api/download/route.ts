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

    const possibleUrls = [
      `https://res.cloudinary.com/${cloudName}/raw/upload/v${decoded.version}/${decoded.publicId}.${decoded.extension}`,
      `https://res.cloudinary.com/${cloudName}/image/upload/v${decoded.version}/${decoded.publicId}.${decoded.extension}`,
      `https://res.cloudinary.com/${cloudName}/raw/upload/${decoded.publicId}.${decoded.extension}`,
      `https://res.cloudinary.com/${cloudName}/image/upload/${decoded.publicId}.${decoded.extension}`,
    ];

    let finalRes = null;
    for (const url of possibleUrls) {
      const res = await fetch(url);
      if (res.ok) {
        finalRes = res;
        break;
      }
    }

    if (!finalRes) {
      return new Response(
        "No se pudo localizar el archivo en la nube. Contacte a soporte.",
        { status: 404 }
      );
    }

    const blob = await finalRes.blob();
    const safeFilename =
      encodeURIComponent(decoded.filename || "recurso") + ".pdf";

    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename*=UTF-8''${safeFilename}`,
      },
    });
  } catch (error) {
    console.error("Download Error:", error);
    return new Response("Link inválido o expirado", { status: 401 });
  }
}

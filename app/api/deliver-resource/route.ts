import { NextResponse } from "next/server";
import { Resend } from "resend";
import ResourceDeliveryEmail from "@/emails/ResourceDeliveryEmail";
import jwt from "jsonwebtoken";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, recursoTitulo, urlArchivo } = await req.json();

    const parts = urlArchivo.split("/");
    const versionPart = parts.find((p: string) => /^v\d+$/.test(p));
    const version = versionPart ? versionPart.substring(1) : "1";

    const versionIndex = parts.findIndex((p: string) => /^v\d+$/.test(p));
    const publicIdWithExt = parts.slice(versionIndex + 1).join("/");
    const extension = publicIdWithExt.split(".").pop() || "pdf";
    const publicId = publicIdWithExt.split(".")[0];

    const secret = (process.env.CLOUDINARY_API_SECRET || "").trim();
    const token = jwt.sign(
      {
        publicId,
        version,
        extension,
        filename: recursoTitulo.replace(/\s+/g, "_"),
      },
      secret,
      { expiresIn: "48h" }
    );

    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host");
    const downloadUrl = `${protocol}://${host}/api/download?token=${token}`;

    await resend.emails.send({
      from: "ConSentido <info@consentidocognitivo.site>",
      to: email,
      subject: `Tu material descargable: ${recursoTitulo}`,
      react: ResourceDeliveryEmail({
        nombreRecurso: recursoTitulo,
        linkDescarga: downloadUrl,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error delivering resource:", error);
    return NextResponse.json({ error: "Fail" }, { status: 500 });
  }
}

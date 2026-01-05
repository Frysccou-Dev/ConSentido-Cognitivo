import { NextResponse } from "next/server";
import { Resend } from "resend";
import WorkshopQueryEmail from "@/emails/WorkshopQueryEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, email, taller, modalidad, mensaje } = await req.json();

    await resend.emails.send({
      from: "ConSentido <info@consentidocognitivo.site>",
      to: "consentidocognitivo@gmail.com",
      subject: `Consulta Taller: ${taller}`,
      react: WorkshopQueryEmail({ nombre, email, taller, modalidad, mensaje }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al enviar la consulta" },
      { status: 500 }
    );
  }
}

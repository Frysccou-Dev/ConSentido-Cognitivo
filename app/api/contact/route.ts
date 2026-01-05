import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/emails/ContactEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, email, interes, mensaje } = await req.json();

    await resend.emails.send({
      from: "ConSentido <info@consentidocognitivo.site>",
      to: "consentidocognitivo@gmail.com",
      subject: `Nueva consulta: ${nombre}`,
      react: ContactEmail({ nombre, email, interes, mensaje }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al enviar el email" },
      { status: 500 }
    );
  }
}

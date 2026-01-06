import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
});

export async function POST(req: Request) {
  try {
    const { resourceId, email } = await req.json();

    if (!resourceId || !email) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const doc = await adminDb.collection("recursos").doc(resourceId).get();
    if (!doc.exists) {
      return NextResponse.json(
        { error: "Recurso no encontrado" },
        { status: 404 }
      );
    }

    const recurso = doc.data();

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            id: resourceId,
            title: recurso?.titulo,
            quantity: 1,
            unit_price: Number(recurso?.precio),
            currency_id: "ARS",
            picture_url: recurso?.urlImagen,
            description: recurso?.descripcion?.substring(0, 250),
          },
        ],
        payer: {
          email: email,
        },
        back_urls: {
          success: `${req.headers.get("origin")}/recursos?status=success`,
          failure: `${req.headers.get("origin")}/recursos?status=failure`,
          pending: `${req.headers.get("origin")}/recursos?status=pending`,
        },
        auto_return: "approved",
        metadata: {
          resource_id: resourceId,
          payer_email: email,
        },
        notification_url: `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(
          /\/$/,
          ""
        )}/api/webhook/mercadopago`,
      },
    });

    return NextResponse.json({ init_point: result.init_point });
  } catch (error) {
    console.error("Error creating preference:", error);
    return NextResponse.json(
      { error: "Error al generar el pago" },
      { status: 500 }
    );
  }
}

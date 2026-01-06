import { MercadoPagoConfig, Payment } from "mercadopago";
import { adminDb } from "@/lib/firebase/admin";
import crypto from "crypto";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
});

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-signature");
    const requestId = req.headers.get("x-request-id");
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;

    if (secret && signature && requestId) {
      const parts = signature.split(",");
      const ts = parts.find((p) => p.startsWith("ts="))?.split("=")[1];
      const v1 = parts.find((p) => p.startsWith("v1="))?.split("=")[1];

      if (ts && v1) {
        const manifest = `id:${requestId};ts:${ts};`;
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(manifest);
        const check = hmac.digest("hex");

        if (check !== v1) {
          return new Response("Invalid Signature", { status: 401 });
        }
      }
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const dataId = searchParams.get("data.id") || searchParams.get("id");

    if (type === "payment" && dataId) {
      const payment = new Payment(client);
      const paymentData = await payment.get({ id: dataId });

      if (paymentData.status === "approved") {
        const { resource_id, payer_email } = paymentData.metadata;

        const doc = await adminDb.collection("recursos").doc(resource_id).get();
        if (doc.exists) {
          const recurso = doc.data();

          await fetch(
            `${(
              process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            ).replace(/\/$/, "")}/api/deliver-resource`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: payer_email,
                recursoTitulo: recurso?.titulo,
                urlArchivo: recurso?.urlArchivo,
              }),
            }
          );
        }
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Error", { status: 500 });
  }
}

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
          console.error("MP Webhook: Invalid Signature");
          return new Response("Invalid Signature", { status: 401 });
        }
      }
    }

    const { searchParams } = new URL(req.url);
    let type = searchParams.get("type");
    let dataId = searchParams.get("data.id") || searchParams.get("id");

    if (!type || !dataId) {
      const body = await req.json().catch(() => ({}));
      type = type || body.type;
      dataId = dataId || (body.data && body.data.id) || body.id;
    }

    if (type === "payment" && dataId) {
      const payment = new Payment(client);
      const paymentData = await payment.get({ id: dataId });

      if (paymentData.status === "approved") {
        let resourceId = paymentData.metadata?.resource_id;
        let payerEmail = paymentData.metadata?.payer_email;

        if (!resourceId && paymentData.external_reference) {
          try {
            const ext = JSON.parse(paymentData.external_reference);
            resourceId = ext.resourceId;
            payerEmail = ext.email;
          } catch {
            console.error("MP Webhook: Fail parsing external_reference");
          }
        }

        if (resourceId && payerEmail) {
          const doc = await adminDb
            .collection("recursos")
            .doc(resourceId)
            .get();
          if (doc.exists) {
            const recurso = doc.data();
            const baseUrl = (
              process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            ).replace(/\/$/, "");

            await fetch(`${baseUrl}/api/deliver-resource`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: payerEmail,
                recursoTitulo: recurso?.titulo,
                urlArchivo: recurso?.urlArchivo,
              }),
            });
          }
        }
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("OK", { status: 200 });
  }
}

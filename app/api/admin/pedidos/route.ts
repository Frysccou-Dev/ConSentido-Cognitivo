import { NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/lib/firebase/admin";
import cloudinary from "@/lib/cloudinary";

async function checkAdmin(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;
  const token = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userDoc = await adminDb
      .collection("usuarios")
      .doc(decodedToken.uid)
      .get();
    const role = userDoc.data()?.rol;
    return role === "admin" || role === "super";
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const snapshot = await adminDb
      .collection("pedidos")
      .orderBy("fechaCreacion", "desc")
      .limit(50)
      .get();

    const pedidos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(pedidos);
  } catch {
    return NextResponse.json(
      { error: "Error al obtener pedidos" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id, estado } = await req.json();

    if (!id || !["aprobado", "rechazado"].includes(estado)) {
      return NextResponse.json({ error: "Datos invalidos" }, { status: 400 });
    }

    const pedidoRef = adminDb.collection("pedidos").doc(id);
    const doc = await pedidoRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: "Pedido no encontrado" },
        { status: 404 }
      );
    }

    const pedido = doc.data();

    if (estado === "aprobado") {
      const protocol = req.headers.get("x-forwarded-proto") || "http";
      const host = req.headers.get("host");
      const baseUrl = `${protocol}://${host}`;

      for (const item of pedido?.recursos || []) {
        try {
          const recursoDoc = await adminDb
            .collection("recursos")
            .doc(item.id)
            .get();
          if (recursoDoc.exists) {
            const recurso = recursoDoc.data();
            await fetch(`${baseUrl}/api/deliver-resource`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: pedido?.email,
                recursoTitulo: recurso?.titulo,
                urlArchivo: recurso?.urlArchivo,
              }),
            });
          }
        } catch (err) {
          console.error("Error deliveirng item:", item.id, err);
        }
      }
    }

    await pedidoRef.update({ estado });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT Pedidos Error:", error);
    return NextResponse.json(
      { error: "Error al actualizar pedido" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ error: "ID faltante" }, { status: 400 });

    const docRef = adminDb.collection("pedidos").doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
      const data = doc.data();
      if (data?.publicId) {
        await cloudinary.uploader.destroy(data.publicId);
      }
    }

    await docRef.delete();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}

"use client";

import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { RecursoPDFSerializado } from "@/types/firebase-types";

export default function CarritoPage() {
  const {
    items: cartItems,
    removeFromCart,
    total,
    clearCart,
    addToCart,
  } = useCart();
  const { showToast, confirm } = useUI();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [syncing, setSyncing] = useState(true);

  // Sincronizar precios con la DB al cargar
  useEffect(() => {
    async function syncCart() {
      const updatedItems: RecursoPDFSerializado[] = [];
      let changed = false;

      for (const item of cartItems) {
        try {
          const docRef = doc(db, "recursos", item.id);
          const snap = await getDoc(docRef);
          if (snap.exists() && snap.data().activo) {
            const freshData = snap.data();
            if (
              freshData.precio !== item.precio ||
              freshData.titulo !== item.titulo
            ) {
              changed = true;
            }
            updatedItems.push({
              id: snap.id,
              ...freshData,
            } as RecursoPDFSerializado);
          } else {
            // Producto ya no existe o no está activo, lo quitamos
            changed = true;
          }
        } catch {
          updatedItems.push(item);
        }
      }

      if (changed) {
        clearCart();
        updatedItems.forEach((i) => addToCart(i));
        showToast("Carrito actualizado con los últimos precios", "info");
      }
      setSyncing(false);
    }

    if (cartItems.length > 0) {
      syncCart();
    } else {
      setSyncing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    comprobante: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, comprobante: e.target.files[0] });
      showToast("Comprobante cargado", "success");
    }
  };

  const handleRemove = (id: string, titulo: string) => {
    confirm({
      title: "¿Quitar del carrito?",
      message: `¿Estás seguro de quitar "${titulo}"?`,
      type: "danger",
      onConfirm: () => {
        removeFromCart(id);
        showToast("Producto quitado", "info");
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.comprobante) {
      showToast("Subí el comprobante primero", "error");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("nombre", formData.nombre);
      data.append("email", formData.email);
      data.append("file", formData.comprobante);
      data.append(
        "items",
        JSON.stringify(cartItems.map((i) => ({ id: i.id, titulo: i.titulo })))
      );
      data.append("total", total.toString());

      const res = await fetch("/api/pedidos", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setSuccess(true);
        clearCart();
        showToast("Pedido enviado con éxito", "success");
      } else {
        const errData = await res.json();
        setError(errData.error || "Hubo un error al procesar el pedido.");
        showToast("Error al procesar pedido", "error");
      }
    } catch {
      setError("Error de conexión con el servidor.");
      showToast("Error de conexión", "error");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-4 bg-fondo">
        <div className="container mx-auto max-w-2xl text-center flex flex-col items-center gap-8">
          <div className="w-24 h-24 bg-primario-cerebro text-white rounded-full flex items-center justify-center text-4xl font-black shadow-xl animate-bounce">
            ✓
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-black text-primario-cerebro uppercase tracking-tighter">
              ¡Pedido Enviado!
            </h1>
            <p className="text-texto-principal opacity-70 font-medium max-w-md mx-auto">
              Recibimos tu comprobante. Un administrador lo validará y te
              llegará el material por mail en las próximas horas.
            </p>
          </div>
          <Link
            href="/recursos"
            className="bg-primario-cerebro text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-anillo-oscuro transition-all"
          >
            Volver a la Biblioteca_
          </Link>
        </div>
      </main>
    );
  }

  if (syncing) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-4 bg-fondo text-center">
        <div className="container mx-auto max-w-md flex flex-col gap-8">
          <div className="animate-spin text-6xl text-primario-cerebro/20">
            ⏳
          </div>
          <h1 className="text-2xl font-black text-primario-cerebro uppercase opacity-50">
            Sincronizando carrito_
          </h1>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-4 bg-fondo text-center">
        <div className="container mx-auto max-w-md flex flex-col gap-8">
          <div className="text-8xl opacity-10">🛒</div>
          <h1 className="text-3xl font-black text-primario-cerebro uppercase">
            El carrito está vacío
          </h1>
          <Link
            href="/recursos"
            className="bg-secundario-corazon text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:opacity-90 transition-all"
          >
            Explorar Materiales
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 bg-fondo">
      <div className="container mx-auto max-w-6xl flex flex-col gap-12">
        <h1 className="text-5xl font-black text-primario-cerebro uppercase tracking-tighter text-center sm:text-left">
          Tu Carrito_
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-[30px] border-2 border-anillo-claro/10 flex items-center gap-6 shadow-sm group"
              >
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-fondo">
                  <Image
                    src={item.urlImagen}
                    alt={item.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grow">
                  <h3 className="font-black text-xl text-primario-cerebro uppercase leading-none tracking-tight mb-2">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-texto-secundario font-medium opacity-60">
                    Formato PDF Digital
                  </p>
                </div>
                <div className="text-right flex flex-col gap-2">
                  <p className="font-black text-secundario-corazon text-lg">
                    ${item.precio}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id, item.titulo)}
                    className="text-[10px] font-black uppercase text-red-400 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-primario-cerebro text-white p-8 rounded-[40px] shadow-xl flex flex-col gap-6 border-b-8 border-anillo-oscuro">
              <h2 className="text-2xl font-black uppercase tracking-widest border-b border-white/20 pb-4 text-white">
                Pago por Transferencia
              </h2>
              <div className="flex flex-col gap-4 bg-white/10 p-6 rounded-3xl backdrop-blur-sm">
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-70 text-white">
                    Titular de la Cuenta
                  </p>
                  <p className="text-lg font-black tracking-tight text-white uppercase">
                    Noelia Silvana Uvilla
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-70 text-white">
                    Alias (Cuenta DNI)
                  </p>
                  <p className="text-lg font-black tracking-tight select-all text-white">
                    LUZ.MEDUSA.FLANCO
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-70 text-white">
                    CBU
                  </p>
                  <p className="text-sm font-black tracking-tight select-all text-white">
                    0140037303718551374893
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 mt-2">
                  <p className="text-[10px] uppercase font-bold opacity-70 text-white">
                    Total a Transferir
                  </p>
                  <p className="text-4xl font-black tracking-tighter text-white">
                    ${total}
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-[40px] shadow-lg border-2 border-anillo-claro/20 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
                  Email para recibir recurso
                </label>
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full bg-fondo border-2 border-anillo-claro/10 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro font-bold"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Juan Perez"
                  className="w-full bg-fondo border-2 border-anillo-claro/10 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro font-bold"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
                  Subir Comprobante
                </label>
                <div className="relative group cursor-pointer">
                  <input
                    type="file"
                    required
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div
                    className={`w-full border-2 border-dashed ${
                      formData.comprobante
                        ? "border-primario-cerebro bg-primario-cerebro/5"
                        : "border-anillo-claro/30 bg-fondo"
                    } rounded-2xl p-6 flex flex-col items-center justify-center gap-2 group-hover:border-primario-cerebro transition-all`}
                  >
                    <span className="text-sm font-bold text-primario-cerebro">
                      {formData.comprobante
                        ? "✓ " + formData.comprobante.name
                        : "Selecionar Archivo"}
                    </span>
                    <span className="text-[10px] text-texto-secundario opacity-40 uppercase font-black">
                      JPG, PNG o Screenshot
                    </span>
                  </div>
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full bg-secundario-corazon text-white py-6 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-sombra-corazon transition-all disabled:opacity-50 mt-4"
              >
                {loading ? "Procesando..." : "Confirmar Pedido_"}
              </button>

              {error && (
                <p className="text-red-500 text-[10px] font-black uppercase italic text-center leading-relaxed">
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

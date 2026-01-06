"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import AdminGuard from "@/components/admin/AdminGuard";
import Image from "next/image";

interface Pedido {
  id: string;
  nombre: string;
  email: string;
  total: number;
  recursos: { id: string; titulo: string }[];
  comprobanteUrl: string;
  estado: "pendiente" | "aprobado" | "rechazado";
  fechaCreacion: { seconds: number };
}

type FilterStatus = "todos" | "pendiente" | "aprobado" | "rechazado";

export default function AdminPedidosPage() {
  const { user } = useAuth();
  const { showToast, confirm } = useUI();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("pendiente");

  const fetchPedidos = useCallback(async () => {
    try {
      const idToken = await user?.getIdToken();
      const res = await fetch("/api/admin/pedidos", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPedidos(data);
      }
    } catch {
      showToast("Error al cargar pedidos", "error");
    } finally {
      setLoading(false);
    }
  }, [user, showToast]);

  useEffect(() => {
    if (user) fetchPedidos();
  }, [user, fetchPedidos]);

  const handleAction = async (id: string, action: "aprobado" | "rechazado") => {
    confirm({
      title: `${action === "aprobado" ? "¿Aprobar" : "¿Rechazar"} pedido?`,
      message: `El pedido de ${
        pedidos.find((p) => p.id === id)?.nombre
      } pasará a estado ${action}.`,
      type: action === "rechazado" ? "danger" : "primary",
      onConfirm: async () => {
        try {
          const idToken = await user?.getIdToken();
          const res = await fetch("/api/admin/pedidos", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({ id, estado: action }),
          });

          if (res.ok) {
            setPedidos((prev) =>
              prev.map((p) => (p.id === id ? { ...p, estado: action } : p))
            );
            showToast(`Pedido ${action} con éxito`, "success");
          }
        } catch {
          showToast("Error al procesar la acción", "error");
        }
      },
    });
  };

  const handleDelete = async (id: string) => {
    confirm({
      title: "¿Eliminar registro?",
      message:
        "Esta acción borrará los datos de la base de datos y el comprobante de Cloudinary permanentemente.",
      type: "danger",
      onConfirm: async () => {
        try {
          const idToken = await user?.getIdToken();
          const res = await fetch(`/api/admin/pedidos?id=${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${idToken}` },
          });

          if (res.ok) {
            setPedidos((prev) => prev.filter((p) => p.id !== id));
            showToast("Registro eliminado por completo", "success");
          }
        } catch {
          showToast("Error al eliminar", "error");
        }
      },
    });
  };

  const filteredPedidos = pedidos.filter((p) =>
    filterStatus === "todos" ? true : p.estado === filterStatus
  );

  const stats = {
    todos: pedidos.length,
    pendiente: pedidos.filter((p) => p.estado === "pendiente").length,
    aprobado: pedidos.filter((p) => p.estado === "aprobado").length,
    rechazado: pedidos.filter((p) => p.estado === "rechazado").length,
  };

  return (
    <AdminGuard>
      <main className="min-h-screen pt-32 pb-20 px-4 bg-fondo">
        <div className="container mx-auto max-w-7xl flex flex-col gap-12">
          <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl font-black text-primario-cerebro uppercase tracking-tighter">
                Gestión de Pedidos_
              </h1>
              <p className="text-texto-secundario font-medium opacity-60">
                Valida los comprobantes de transferencia y libera el material
                digital.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 bg-white/50 p-1.5 rounded-2xl border border-anillo-claro/10 backdrop-blur-sm self-start">
              {(
                [
                  "todos",
                  "pendiente",
                  "aprobado",
                  "rechazado",
                ] as FilterStatus[]
              ).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    filterStatus === status
                      ? "bg-primario-cerebro text-white shadow-lg"
                      : "text-primario-cerebro/40 hover:text-primario-cerebro hover:bg-white"
                  }`}
                >
                  {status} ({stats[status]})
                </button>
              ))}
            </div>
          </header>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-primario-cerebro border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredPedidos.map((pedido) => (
                <div
                  key={pedido.id}
                  className={`bg-white rounded-[40px] border-2 ${
                    pedido.estado === "pendiente"
                      ? "border-secundario-corazon/20 shadow-[10px_10px_40px_rgba(235,148,131,0.05)]"
                      : "border-anillo-claro/10 opacity-70"
                  } p-8 flex flex-col lg:flex-row gap-8 shadow-sm transition-all hover:shadow-md h-full`}
                >
                  <div
                    className="relative w-full lg:w-48 aspect-square rounded-3xl overflow-hidden bg-fondo cursor-pointer group shrink-0"
                    onClick={() => setSelectedImg(pedido.comprobanteUrl)}
                  >
                    <Image
                      src={pedido.comprobanteUrl}
                      alt="Comprobante"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-bold text-xs uppercase">
                        Ver Full
                      </span>
                    </div>
                  </div>

                  <div className="grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/40">
                        Usuario
                      </span>
                      <p className="font-black text-primario-cerebro text-xl leading-none uppercase">
                        {pedido.nombre}
                      </p>
                      <p className="text-sm font-medium text-texto-secundario">
                        {pedido.email}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/40">
                        Materiales ({pedido.recursos.length})
                      </span>
                      <ul className="flex flex-col gap-1">
                        {pedido.recursos.map((r) => (
                          <li
                            key={r.id}
                            className="text-xs font-bold text-primario-cerebro leading-tight"
                          >
                            • {r.titulo}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/40">
                        Monto & Estado
                      </span>
                      <p className="font-black text-2xl text-secundario-corazon">
                        ${pedido.total}
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase border w-fit ${
                          pedido.estado === "pendiente"
                            ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                            : pedido.estado === "aprobado"
                            ? "bg-green-50 text-green-600 border-green-200"
                            : "bg-red-50 text-red-600 border-red-200"
                        }`}
                      >
                        {pedido.estado}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-3 justify-center">
                    {pedido.estado === "pendiente" && (
                      <>
                        <button
                          onClick={() => handleAction(pedido.id, "aprobado")}
                          className="bg-green-500 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg shadow-green-200"
                        >
                          Aprobar
                        </button>
                        <button
                          onClick={() => handleAction(pedido.id, "rechazado")}
                          className="bg-red-500 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-200"
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                    {pedido.estado !== "pendiente" && (
                      <button
                        onClick={() => handleDelete(pedido.id)}
                        className="bg-gray-100 text-gray-400 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all"
                      >
                        Eliminar Registro
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {filteredPedidos.length === 0 && (
                <div className="text-center py-20 opacity-20 text-2xl font-black uppercase tracking-widest">
                  No hay pedidos en esta categoría_
                </div>
              )}
            </div>
          )}
        </div>

        {selectedImg && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in"
            onClick={() => setSelectedImg(null)}
          >
            <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
              <Image
                src={selectedImg}
                alt="Comprobante Full"
                fill
                className="object-contain"
              />
            </div>
            <button className="absolute top-8 right-8 text-white text-4xl font-light">
              ×
            </button>
          </div>
        )}
      </main>
    </AdminGuard>
  );
}

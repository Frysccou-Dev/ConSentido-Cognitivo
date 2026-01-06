"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ResourceForm from "@/components/admin/ResourceForm";
import { RecursoPDFSerializado } from "@/types/firebase-types";
import AdminGuard from "@/components/admin/AdminGuard";
import { auth } from "@/lib/firebase/firebase";
import { useUI } from "@/context/UIContext";

export default function AdminRecursosPage() {
  const { showToast, confirm } = useUI();
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState<
    RecursoPDFSerializado | undefined
  >();
  const [recursos, setRecursos] = useState<RecursoPDFSerializado[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecursos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/recursos");
      const data = await res.json();
      setRecursos(data);
    } catch {
      showToast("Error al cargar materiales", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecursos();
  }, []);

  const handleSuccess = () => {
    setShowForm(false);
    setEditingResource(undefined);
    fetchRecursos();
  };

  const handleDelete = async (id: string) => {
    confirm({
      title: "¿Eliminar material?",
      message: "Esta acción quitará el recurso de la biblioteca pública.",
      type: "danger",
      onConfirm: async () => {
        try {
          const idToken = await auth.currentUser?.getIdToken();
          const res = await fetch(`/api/admin/recursos?id=${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
          if (res.ok) {
            showToast("Recurso eliminado", "success");
            fetchRecursos();
          }
        } catch {
          showToast("Error al eliminar", "error");
        }
      },
    });
  };

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const closeMenu = () => setOpenMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showForm]);

  return (
    <AdminGuard>
      <main className="min-h-screen bg-fondo/30 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-20">
            <div className="flex flex-col gap-4">
              <span className="text-secundario-corazon font-black uppercase tracking-[0.4em] text-[10px] opacity-60">
                Admin Dashboard
              </span>
              <h1 className="text-7xl font-black text-primario-cerebro uppercase tracking-tighter leading-[0.8]">
                Materiales
                <br />
                <span className="text-secundario-corazon">Disponibles_</span>
              </h1>
            </div>
            <button
              onClick={() => {
                setEditingResource(undefined);
                setShowForm(true);
              }}
              className="group relative bg-primario-cerebro text-white font-black uppercase tracking-widest px-12 py-6 rounded-2rem overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Nuevo Recurso_</span>
              <div className="absolute inset-0 bg-linear-to-r from-primario-cerebro to-secundario-corazon opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {showForm && (
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-primario-cerebro/60 backdrop-blur-xl animate-in fade-in duration-500">
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] relative shadow-2xl animate-in zoom-in-95 duration-300"
              >
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingResource(undefined);
                  }}
                  className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-fondo hover:bg-red-50 text-primario-cerebro hover:text-red-500 rounded-2xl shadow-xl transition-all active:scale-90 border border-anillo-claro/10"
                >
                  <span className="text-2xl font-light">✕</span>
                </button>
                <ResourceForm
                  onSuccess={handleSuccess}
                  initialData={editingResource}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-full text-center py-40 font-black text-primario-cerebro/10 text-5xl uppercase tracking-tighter">
                Cargando biblioteca_
              </div>
            ) : recursos.length === 0 ? (
              <div className="col-span-full text-center py-40 font-black text-primario-cerebro/10 text-5xl uppercase tracking-tighter">
                Sin materiales_
              </div>
            ) : (
              recursos.map((recurso) => (
                <div
                  key={recurso.id}
                  className="group relative bg-white rounded-[3rem] p-4 flex flex-col gap-6 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(75,103,62,0.15)] border border-transparent hover:border-primario-cerebro/5"
                >
                  <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-fondo shadow-inner">
                    <Image
                      src={recurso.urlImagen}
                      alt={recurso.titulo}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/50">
                      <span
                        className={`text-[10px] font-black uppercase tracking-tighter ${
                          recurso.activo ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {recurso.activo ? "● ACTIVO" : "● OCULTO"}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 flex flex-col gap-2 scale-0 group-hover:scale-100 transition-transform duration-500 origin-top-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(
                            openMenu === recurso.id ? null : recurso.id
                          );
                        }}
                        className="w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-2xl shadow-xl text-primario-cerebro hover:bg-primario-cerebro hover:text-white transition-all active:scale-90"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                      </button>

                      {openMenu === recurso.id && (
                        <div className="absolute top-14 right-0 w-48 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-anillo-claro/10 py-3 z-20 animate-in slide-in-from-top-2 duration-200">
                          <button
                            onClick={() => {
                              setEditingResource(recurso);
                              setShowForm(true);
                            }}
                            className="w-full px-6 py-3 text-left text-xs font-black uppercase text-primario-cerebro hover:bg-primario-cerebro/5 transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(recurso.id)}
                            className="w-full px-6 py-3 text-left text-xs font-black uppercase text-red-500 hover:bg-red-50 transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-2xl shadow-sm border border-white/50 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[14px] font-black text-primario-cerebro tracking-tighter italic">
                        {recurso.precio === 0 ? "FREE" : `$${recurso.precio}`}
                      </span>
                    </div>
                  </div>

                  <div className="px-4 pb-6 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {recurso.categorias.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className="text-[9px] font-black uppercase tracking-widest text-primario-cerebro/30"
                        >
                          #{cat.replace(/\s+/g, "")}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-black text-primario-cerebro tracking-tighter leading-[0.9] uppercase group-hover:text-secundario-corazon transition-colors">
                      {recurso.titulo}
                    </h3>
                    <p className="text-xs text-texto-principal/50 font-medium line-clamp-2 leading-relaxed italic">
                      {recurso.descripcion}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </AdminGuard>
  );
}

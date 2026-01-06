"use client";

import { useState } from "react";
import { RecursoPDFSerializado } from "@/types/firebase-types";
import { auth } from "@/lib/firebase/firebase";
import { useUI } from "@/context/UIContext";

interface ResourceFormProps {
  onSuccess: () => void;
  initialData?: RecursoPDFSerializado;
}

export default function ResourceForm({
  onSuccess,
  initialData,
}: ResourceFormProps) {
  const { showToast } = useUI();
  const [loading, setLoading] = useState(false);
  const [uploadingStates, setUploadingStates] = useState({
    image: false,
    pdf: false,
  });
  const [formData, setFormData] = useState({
    titulo: initialData?.titulo || "",
    descripcion: initialData?.descripcion || "",
    precio: initialData?.precio || 0,
    categorias: initialData?.categorias || [],
    publico: initialData?.publico || [],
    urlImagen: initialData?.urlImagen || "",
    urlArchivo: initialData?.urlArchivo || "",
    activo: initialData?.hasOwnProperty("activo") ? initialData.activo : true,
  });

  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const categoriesOptions = Array.from(
    new Set([
      "Memoria",
      "Atención",
      "Lenguaje",
      "Funciones ejecutivas",
      "Orientación",
      "Habilidades visoespaciales",
      ...customCategories,
      ...(initialData?.categorias || []),
    ])
  );

  const publicOptions = ["Hogar", "Consultorio", "Institución"];

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    if (!categoriesOptions.includes(newCategory)) {
      setCustomCategories((prev) => [...prev, newCategory]);
    }
    if (!formData.categorias.includes(newCategory)) {
      setFormData((prev) => ({
        ...prev,
        categorias: [...prev.categorias, newCategory],
      }));
    }
    setNewCategory("");
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "pdf"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingStates((prev) => ({
      ...prev,
      [type === "image" ? "image" : "pdf"]: true,
    }));
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append(
      "folder",
      type === "image" ? "consentido/portadas" : "consentido/pdfs"
    );

    try {
      const idToken = await auth.currentUser?.getIdToken();
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: uploadData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          [type === "image" ? "urlImagen" : "urlArchivo"]: data.secure_url,
        }));
        showToast(
          `${type === "image" ? "Imagen" : "PDF"} subido con éxito`,
          "success"
        );
      }
    } catch {
      showToast(`Error al subir ${type}`, "error");
    } finally {
      setUploadingStates((prev) => ({
        ...prev,
        [type === "image" ? "image" : "pdf"]: false,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const idToken = await auth.currentUser?.getIdToken();
      const method = initialData ? "PUT" : "POST";
      const res = await fetch("/api/admin/recursos", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          ...formData,
          id: initialData?.id,
        }),
      });

      if (res.ok) {
        showToast(
          initialData ? "Recurso actualizado" : "Recurso creado con éxito",
          "success"
        );
        onSuccess();
      }
    } catch {
      showToast("Error al guardar el recurso", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 bg-white p-10 rounded-[40px] shadow-2xl border-2 border-primario-cerebro/5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
              Título del Recurso
            </label>
            <input
              type="text"
              required
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              className="w-full bg-fondo/50 border-2 border-anillo-claro/10 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro font-bold"
              placeholder="Ej: Cuadernillo de Memoria..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
              Descripción
            </label>
            <textarea
              required
              rows={4}
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              className="w-full bg-fondo/50 border-2 border-anillo-claro/10 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro font-medium resize-none"
              placeholder="Detallá de qué trata el material..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
              Precio (0 = Gratis)
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.precio}
              onChange={(e) =>
                setFormData({ ...formData, precio: Number(e.target.value) })
              }
              className="w-full bg-fondo/50 border-2 border-anillo-claro/10 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro font-bold"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 bg-fondo/30 p-6 rounded-3xl border-2 border-anillo-claro/5 mb-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
                  Estado del Recurso
                </label>
                <span className="text-[14px] font-black text-primario-cerebro uppercase tracking-tighter italic">
                  {formData.activo ? "Visible al Público" : "Oculto (Borrador)"}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, activo: !formData.activo })
                }
                className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                  formData.activo
                    ? "bg-primario-cerebro"
                    : "bg-primario-cerebro/20"
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-sm ${
                    formData.activo ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
              Categorías
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddCategory())
                }
                placeholder="Nueva categoría..."
                className="flex-1 bg-fondo/50 border-2 border-anillo-claro/10 rounded-xl px-4 py-2 outline-none focus:border-primario-cerebro text-xs font-bold"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-primario-cerebro text-white px-4 py-2 rounded-xl text-xs font-black uppercase"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categoriesOptions.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    const exists = formData.categorias.includes(cat);
                    setFormData({
                      ...formData,
                      categorias: exists
                        ? formData.categorias.filter((c) => c !== cat)
                        : [...formData.categorias, cat],
                    });
                  }}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                    formData.categorias.includes(cat)
                      ? "bg-primario-cerebro text-white border-primario-cerebro"
                      : "bg-white text-primario-cerebro border-anillo-claro/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
              Público
            </label>
            <div className="flex flex-wrap gap-2">
              {publicOptions.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    const exists = formData.publico.includes(
                      p as "Hogar" | "Consultorio" | "Institución"
                    );
                    setFormData({
                      ...formData,
                      publico: exists
                        ? formData.publico.filter((item) => item !== p)
                        : [
                            ...formData.publico,
                            p as "Hogar" | "Consultorio" | "Institución",
                          ],
                    });
                  }}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                    formData.publico.includes(
                      p as "Hogar" | "Consultorio" | "Institución"
                    )
                      ? "bg-secundario-corazon text-white border-secundario-corazon"
                      : "bg-white text-secundario-corazon border-anillo-claro/20"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t-2 border-primario-cerebro/5 pt-8">
        <div className="flex flex-col gap-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
            Imagen de Portada
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "image")}
            className="hidden"
            id="cover-upload"
          />
          <label
            htmlFor="cover-upload"
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2rem p-6 cursor-pointer transition-all min-h-35 ${
              formData.urlImagen
                ? "border-primario-cerebro/40 bg-primario-cerebro/5"
                : "border-anillo-claro/30 hover:bg-fondo/50"
            }`}
          >
            {uploadingStates.image ? (
              <div className="flex flex-col items-center gap-3 animate-pulse">
                <div className="w-8 h-8 border-[6px] border-primario-cerebro border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro">
                  Subiendo imagen_
                </span>
              </div>
            ) : formData.urlImagen ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-primario-cerebro text-white rounded-full flex items-center justify-center shadow-lg">
                  ✓
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro">
                  ¡Imagen Lista!
                </span>
                <span className="text-[8px] opacity-40 font-bold uppercase tracking-widest mt-1">
                  Clic para cambiar
                </span>
              </div>
            ) : (
              <span className="text-[10px] font-black uppercase tracking-widest text-texto-secundario/60 italic">
                Subir imagen_
              </span>
            )}
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
            Archivo PDF
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileUpload(e, "pdf")}
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2rem p-6 cursor-pointer transition-all min-h-35 ${
              formData.urlArchivo
                ? "border-secundario-corazon/40 bg-secundario-corazon/5"
                : "border-anillo-claro/30 hover:bg-fondo/50"
            }`}
          >
            {uploadingStates.pdf ? (
              <div className="flex flex-col items-center gap-3 animate-pulse">
                <div className="w-8 h-8 border-[6px] border-secundario-corazon border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-widest text-secundario-corazon">
                  Subiendo archivo_
                </span>
              </div>
            ) : formData.urlArchivo ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-secundario-corazon text-white rounded-full flex items-center justify-center shadow-lg">
                  ✓
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-secundario-corazon">
                  ¡PDF Listo!
                </span>
                <span className="text-[8px] opacity-40 font-bold uppercase tracking-widest mt-1">
                  Clic para cambiar
                </span>
              </div>
            ) : (
              <span className="text-[10px] font-black uppercase tracking-widest text-texto-secundario/60 italic">
                Subir PDF_
              </span>
            )}
          </label>
        </div>
      </div>

      <button
        disabled={loading || !formData.urlArchivo || !formData.urlImagen}
        className="w-full bg-primario-cerebro text-white font-black uppercase tracking-widest py-6 rounded-3xl shadow-xl hover:bg-anillo-oscuro transition-all disabled:opacity-50 mt-4"
      >
        {loading
          ? "Procesando..."
          : initialData
          ? "Actualizar Recurso_"
          : "Crear Recurso_"}
      </button>
    </form>
  );
}

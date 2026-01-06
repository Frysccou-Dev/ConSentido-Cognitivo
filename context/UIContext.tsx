"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface Confirm {
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "primary";
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  confirm: (data: Confirm) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmData, setConfirmData] = useState<Confirm | null>(null);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const confirm = useCallback((data: Confirm) => {
    setConfirmData(data);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, confirm }}>
      {children}

      {/* Toast UI */}
      <div className="fixed bottom-8 right-8 z-[200] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-8 py-5 rounded-[22px] shadow-2xl border-b-4 border-black/10 transition-all animate-in slide-in-from-right-10 duration-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-4 ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : toast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-primario-cerebro text-white"
            }`}
          >
            <span className="text-lg">
              {toast.type === "success" ? "✓" : "!"}
            </span>
            {toast.message}
          </div>
        ))}
      </div>

      {/* Confirm UI */}
      {confirmData && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-primario-cerebro/40 backdrop-blur-md"
            onClick={() => setConfirmData(null)}
          />
          <div className="relative bg-white w-full max-w-sm rounded-[40px] p-10 flex flex-col gap-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col gap-3">
              <h3 className="text-3xl font-black text-primario-cerebro uppercase tracking-tighter leading-none">
                {confirmData.title}
              </h3>
              <p className="text-texto-principal opacity-60 font-medium leading-relaxed italic pr-4">
                {confirmData.message}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  confirmData.onConfirm();
                  setConfirmData(null);
                }}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all hover:-translate-y-1 shadow-lg ${
                  confirmData.type === "danger"
                    ? "bg-red-500 text-white"
                    : "bg-primario-cerebro text-white"
                }`}
              >
                {confirmData.confirmText || "Confirmar_"}
              </button>
              <button
                onClick={() => setConfirmData(null)}
                className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-primario-cerebro/40 hover:text-primario-cerebro transition-all"
              >
                {confirmData.cancelText || "Volver"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useUI must be used within ToastProvider");
  return context;
};

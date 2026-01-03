"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { doc, getDoc } from "firebase/firestore";
import { Usuario } from "@/types/firebase-types";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDoc = await getDoc(
        doc(db, "usuarios", userCredential.user.uid)
      );

      if (userDoc.exists()) {
        const userData = userDoc.data() as Usuario;
        setSession(userData);
        router.push("/");
      } else {
        setError("Usuario no encontrado en la base de datos.");
      }
    } catch {
      setError("Credenciales inválidas. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-10 rounded-[40px] border-2 border-primario-cerebro/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-primario-cerebro"></div>

      <div className="flex flex-col gap-8 relative z-10">
        <div className="flex flex-col gap-2">
          <span className="text-secundario-corazon font-black uppercase tracking-[0.2em] text-[10px]">
            Acceso Restringido
          </span>
          <h1 className="text-3xl font-black text-primario-cerebro uppercase tracking-tighter leading-none">
            Identificación
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 italic">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
              Email Admin
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@correo.com"
              required
              className="w-full bg-fondo/50 border-2 border-anillo-claro/20 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro transition-all font-medium"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-primario-cerebro/60">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-fondo/50 border-2 border-anillo-claro/20 rounded-2xl px-6 py-4 outline-none focus:border-primario-cerebro transition-all font-medium"
            />
          </div>

          <button
            disabled={loading}
            className="bg-primario-cerebro text-white font-bold uppercase tracking-widest py-5 rounded-2xl shadow-xl hover:bg-anillo-oscuro transition-all mt-4 disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Ingresar al Sistema"}
          </button>
        </form>
      </div>
    </div>
  );
}

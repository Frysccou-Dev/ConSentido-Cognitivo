"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      !loading &&
      (!userData || (userData.rol !== "admin" && userData.rol !== "super"))
    ) {
      router.replace("/");
    }
  }, [userData, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-fondo flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primario-cerebro border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!userData || (userData.rol !== "admin" && userData.rol !== "super")) {
    return null;
  }

  return <>{children}</>;
}

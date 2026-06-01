"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PetsAdminPage() {

  const router = useRouter();

  useEffect(() => {

    router.replace(
      "/prized-pets/admin"
    );

  }, [router]);

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      Redirecting to Prized Pets Admin...

    </div>

  );

}
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Optional: replace with your real workspace ID dynamically if needed
    router.replace("/dashboard/workspace-test");
  }, [router]);

  return null;
}
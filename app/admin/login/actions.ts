"use server";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }

  const hash = createHash("sha256").update(password).digest("hex");
  const store = await cookies();
  store.set("admin_session", hash, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/admin");
}

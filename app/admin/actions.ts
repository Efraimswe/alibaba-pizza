"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { saveMenu, type Menu } from "@/lib/menu";

export async function saveMenuAction(menu: Menu) {
  await saveMenu(menu);
}

export async function logoutAction() {
  const store = await cookies();
  store.delete("admin_session");
  redirect("/admin/login");
}

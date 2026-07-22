import { getMenu } from "@/lib/menu";
import { AdminClient } from "./admin-client";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const menu = await getMenu();
  return <AdminClient initialMenu={menu} />;
}

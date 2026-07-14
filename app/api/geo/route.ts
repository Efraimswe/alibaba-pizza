import { headers } from "next/headers";

// GeoIP по заголовкам Vercel: грубая оценка (город), без разрешений.
// На localhost заголовков нет — вернутся null, клиент покажет только кнопку.
export const dynamic = "force-dynamic";

export async function GET() {
  const h = await headers();
  const lat = h.get("x-vercel-ip-latitude");
  const lon = h.get("x-vercel-ip-longitude");
  return Response.json({
    lat: lat ? Number(lat) : null,
    lon: lon ? Number(lon) : null,
  });
}

"use client";

import { useState } from "react";
import { RESTAURANT, haversineKm } from "@/lib/geo";

type Status = "idle" | "loading" | "error" | "success";

export function Distance({
  labelShow,
  loading,
  error,
  suffixKm,
  suffixM,
}: {
  labelShow: string;
  loading: string;
  error: string;
  suffixKm: string;
  suffixM: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState("");

  const handleClick = () => {
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const km = haversineKm(
          pos.coords.latitude,
          pos.coords.longitude,
          RESTAURANT.lat,
          RESTAURANT.lon,
        );
        setResult(
          km < 1
            ? `≈ ${Math.round(km * 1000)} ${suffixM}`
            : `≈ ${km.toFixed(1).replace(".", ",")} ${suffixKm}`,
        );
        setStatus("success");
      },
      () => setStatus("error"),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === "loading"}
      className="press flex min-h-11 w-fit items-center gap-2 rounded-full bg-surface-alt px-4 py-2 text-left font-display text-sm font-bold"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0"
        fill="currentColor"
      >
        <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7 12 7.3 12.28a1 1 0 0 0 1.4 0C13 22 20 15.25 20 10c0-4.42-3.58-8-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
      </svg>
      <span>
        {status === "idle" && labelShow}
        {status === "loading" && loading}
        {status === "error" && error}
        {status === "success" && result}
      </span>
    </button>
  );
}

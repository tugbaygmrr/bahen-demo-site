import type { NextRequest } from "next/server";

const ALLOWED_HOSTS = new Set(["www.bahen.com.tr", "bahen.com.tr"]);

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new Response("Missing url", { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return new Response("Invalid url", { status: 400 });
  }
  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return new Response("Forbidden host", { status: 403 });
  }
  if (parsed.protocol !== "https:") {
    return new Response("HTTPS only", { status: 400 });
  }

  const upstream = await fetch(parsed.toString(), {
    headers: { "user-agent": "BahenImageProxy/1.0" },
  });
  if (!upstream.ok || !upstream.body) {
    return new Response("Upstream error", { status: upstream.status || 502 });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "image/jpeg",
      "cache-control": "public, max-age=604800, immutable",
      "access-control-allow-origin": "*",
    },
  });
}

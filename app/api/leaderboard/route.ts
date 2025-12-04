import kv from "@/lib/kv";
import { NextResponse } from "next/server";
export async function GET() {
  const today = new Date().toISOString().split("T")[0];
  const prefix = `tap:*:${today}`;
  const keys = await kv.keys(prefix);
  const data = [];
  for (const key of keys) {
    const count = await kv.get<number>(key);
    const fid = key.split(":")[1];
    data.push({ fid, count: count || 0 });
  }
  data.sort((a, b) => b.count - a.count);
  return NextResponse.json(data.slice(0, 20));
}
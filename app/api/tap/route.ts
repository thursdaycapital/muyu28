import kv from "import kv from "../../../lib/kv";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { fid } = await req.json();
  if (!fid) return NextResponse.json({ ok: false, message: "缺少 fid" });
  const today = new Date().toISOString().split("T")[0];
  const key = `tap:${fid}:${today}`;
  const count = (await kv.get<number>(key)) || 0;
  if (count >= 28) {
    return NextResponse.json({ ok: false, message: "今日已敲满 28 次" });
  }
  await kv.incr(key);
  await kv.expire(key, 86400);
  return NextResponse.json({ ok: true, count: count + 1 });
}

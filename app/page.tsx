"use client";
import { useEffect, useState } from "react";
export default function Home() {
  const [fid, setFid] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const [leaders, setLeaders] = useState<any[]>([]);
  useEffect(() => {
    import("@farcaster/miniapp-sdk").then(async ({ sdk }) => {
      const ctx = await sdk.context;
      setFid(ctx?.user?.fid || null);
      sdk.actions.ready();
    });
  }, []);
  const tap = async () => {
    if (!fid) return alert("Farcaster 登录错误");
    const res = await fetch("/api/tap", {
      method: "POST",
      body: JSON.stringify({ fid })
    });
    const data = await res.json();
    if (!data.ok) return alert(data.message);
    setCount(data.count);
  };
  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then(setLeaders);
  }, []);
  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🪷 敲木鱼 28 次</h1>
      <p>今日已敲：{count} / 28</p>
      <button onClick={tap} style={{ padding: "16px 28px", fontSize: 22, marginTop: 20, borderRadius: 12 }}>
        🪵 敲一下
      </button>
      <h2 style={{ marginTop: 40 }}>🏆 今日排行榜</h2>
      {leaders.map((l, i) => (
        <div key={i} style={{ marginBottom: 8 }}>
          {i + 1}. FID {l.fid} — {l.count} 次
        </div>
      ))}
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

// 매초 바뀌는 부분만 클라이언트로 분리. 첫 렌더는 서버와 같게 비워둬요.
export function Countdown({ endsAt }: { endsAt: string }) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, new Date(endsAt).getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (left === null) return <span className="tabular-nums">--:--:--</span>;
  if (left === 0) return <span>종료</span>;
  const s = Math.floor(left / 1000);
  const days = Math.floor(s / 86400);
  return (
    <span className="tabular-nums" aria-label={`남은 시간 ${days}일 ${Math.floor((s % 86400) / 3600)}시간`}>
      {days > 0 && `${days}일 `}{pad(Math.floor((s % 86400) / 3600))}:{pad(Math.floor((s % 3600) / 60))}:{pad(s % 60)}
    </span>
  );
}

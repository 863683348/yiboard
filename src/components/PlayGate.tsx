'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { FriendGame } from './FriendGame';
import { GomokuGame } from './GomokuGame';
import { MatchMaker } from './MatchMaker';

/**
 * 游戏模式门控（客户端）。
 * 服务端 play 页面不读 searchParams —— 读取 searchParams 会把页面标记为
 * 动态渲染，导致 revalidate/ISR 失效（Vercel 上每次请求真 SSR，FOT 飙升）。
 * 这里把模式判断下沉到客户端组件，用 useSearchParams 读取 ?mode=?room=，
 * 服务端输出保持静态可缓存。
 *
 * 三种模式互斥：随机匹配 > 好友房 > 人机（房间号一旦存在，直接进房优先级最高）。
 */
function PlayGateInner() {
  const sp = useSearchParams();
  const mode = sp.get('mode');
  const room = sp.get('room');

  const friend = mode === 'friend' || Boolean(room);
  const match = mode === 'match' && !room;
  const aivsai = mode === 'aivsai' && !friend && !match;
  const ai = !friend && !match && !aivsai;

  return (
    <>
      {match ? <MatchMaker /> : null}
      {friend ? <FriendGame initialCode={room ?? null} /> : null}
      {aivsai ? <GomokuGame variant="full" autoMode /> : null}
      {ai ? <GomokuGame variant="full" /> : null}
    </>
  );
}

export default function PlayGate() {
  return (
    <Suspense fallback={<GomokuGame variant="full" />}>
      <PlayGateInner />
    </Suspense>
  );
}

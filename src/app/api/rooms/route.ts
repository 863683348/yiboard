import { fail, ok, readJson } from '@/lib/http';
import { toView } from '@/lib/rooms';
import { ensureUser } from '@/lib/session';
import { getStore } from '@/lib/store';

const SIZES = [9, 13, 15] as const;
const WIN_COUNTS = [5, 6, 7] as const;

interface Body {
  size?: unknown;
  winCount?: unknown;
}

/** 开一间房。创建者执黑。可带变体配置（棋盘尺寸/连珠数），默认 15×15/五连。 */
export async function POST(request: Request) {
  const user = await ensureUser();

  let size = 15;
  let winCount = 5;
  if (request.headers.get('content-type')?.includes('application/json')) {
    const body = await readJson<Body>(request);
    if (body) {
      if (body.size !== undefined) {
        if (typeof body.size !== 'number' || !(SIZES as readonly number[]).includes(body.size)) {
          return fail('BAD_REQUEST', 'INVALID_SIZE');
        }
        size = body.size;
      }
      if (body.winCount !== undefined) {
        if (
          typeof body.winCount !== 'number' ||
          !(WIN_COUNTS as readonly number[]).includes(body.winCount)
        ) {
          return fail('BAD_REQUEST', 'INVALID_WIN_COUNT');
        }
        winCount = body.winCount;
      }
      if (winCount > size) return fail('BAD_REQUEST', 'INVALID_VARIANT');
    }
  }

  const room = await getStore().createRoom({ hostId: user.id, size, winCount });
  return ok(toView(room, user.id));
}

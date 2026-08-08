import { ok } from '@/lib/http';
import { toView } from '@/lib/rooms';
import { ensureUser } from '@/lib/session';
import { getStore } from '@/lib/store';

/** 开一间房。创建者执黑。 */
export async function POST() {
  const user = await ensureUser();
  const room = await getStore().createRoom({ hostId: user.id });
  return ok(toView(room, user.id));
}

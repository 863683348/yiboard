// 一次性：types/memory/neon 加 getPasswordHash，login 改用
const fs = require('fs');

// 1) types.ts
let t = fs.readFileSync('src/lib/store/types.ts', 'utf8');
if (!t.includes('getPasswordHash')) {
  t = t.replace(
    '  findUserByUsername(username: string): Promise<UserRecord | null>;',
    '  findUserByUsername(username: string): Promise<UserRecord | null>;\n  /** 登录校验用：拿密码哈希（UserRecord 不暴露哈希，保持最小面） */\n  getPasswordHash(userId: string): Promise<string | null>;',
  );
  fs.writeFileSync('src/lib/store/types.ts', t);
  console.log('types.ts: getPasswordHash added');
}

// 2) memory.ts
let m = fs.readFileSync('src/lib/store/memory.ts', 'utf8');
if (!m.includes('async getPasswordHash')) {
  m = m.replace(
    '  async upgradeGuest({ userId, username, email, passwordHash, displayName }) {',
    '  async getPasswordHash(userId) {\n    return passwords.get(userId) ?? null;\n  },\n\n  async upgradeGuest({ userId, username, email, passwordHash, displayName }) {',
  );
  fs.writeFileSync('src/lib/store/memory.ts', m);
  console.log('memory.ts: getPasswordHash added');
}

// 3) neon.ts —— 在 findUserByUsername 后插入 getPasswordHash
let n = fs.readFileSync('src/lib/store/neon.ts', 'utf8');
if (!n.includes('async getPasswordHash')) {
  n = n.replace(
    '    async findUserByUsername(username) {\n      const rows = await db\n        .select()\n        .from(users)\n        .where(eq(users.username, username))\n        .limit(1);\n      const row = rows[0];\n      if (!row) return null;\n      return {\n        id: row.id,\n        displayName: row.displayName,\n        username: row.username ?? null,\n        email: row.email ?? null,\n        locale: row.locale,\n        elo: row.elo,\n        gamesPlayed: row.gamesPlayed,\n        gamesWon: row.gamesWon,\n        isGuest: row.isGuest,\n        createdAt: row.createdAt.toISOString(),\n      };\n    },',
    '    async findUserByUsername(username) {\n      const rows = await db\n        .select()\n        .from(users)\n        .where(eq(users.username, username))\n        .limit(1);\n      const row = rows[0];\n      if (!row) return null;\n      return {\n        id: row.id,\n        displayName: row.displayName,\n        username: row.username ?? null,\n        email: row.email ?? null,\n        locale: row.locale,\n        elo: row.elo,\n        gamesPlayed: row.gamesPlayed,\n        gamesWon: row.gamesWon,\n        isGuest: row.isGuest,\n        createdAt: row.createdAt.toISOString(),\n      };\n    },\n\n    async getPasswordHash(userId) {\n      const rows = await db\n        .select({ passwordHash: users.passwordHash })\n        .from(users)\n        .where(eq(users.id, userId))\n        .limit(1);\n      return rows[0]?.passwordHash ?? null;\n    },',
  );
  fs.writeFileSync('src/lib/store/neon.ts', n);
  console.log('neon.ts: getPasswordHash added');
}

// 4) login route —— 改用 getPasswordHash
let l = fs.readFileSync('src/app/api/auth/login/route.ts', 'utf8');
if (!l.includes('getPasswordHash')) {
  l = l.replace(
    `  // 用户不存在 / 无密码（Google 账号）→ 统一报错，不泄露账号是否存在
  if (!user || !user.passwordHash || !(await verifyPassword(password, user.passwordHash))) {`,
    `  // 用户不存在 / 无密码（Google 账号）→ 统一报错，不泄露账号是否存在
  const passwordHash = user ? await store.getPasswordHash(user.id) : null;
  if (!user || !passwordHash || !(await verifyPassword(password, passwordHash))) {`,
  );
  fs.writeFileSync('src/app/api/auth/login/route.ts', l);
  console.log('login route: uses getPasswordHash');
}

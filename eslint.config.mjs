import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

/** Next.js 16 flat config（eslint 9）：web vitals + TS 规则。 */
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // React 19 新规则对"AI 回合触发外部计算"等场景误报严重，降为 warn 保留可见性。
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'node_modules/**', 'src/messages/**', 'scripts/**']),
]);

import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true, //★GitHub Pages에 배포하는 경우 정적 배포로, SSR false
  basename:"/test-CRR/" // ★GitHub Pages 서브폴더일 경우 반드시 깃헙 리포지토리 이름 필요
} satisfies Config;

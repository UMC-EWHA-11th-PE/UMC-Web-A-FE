import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 예제 프로젝트와 같이 Tailwind CSS를 Turbopack 로더로 처리
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

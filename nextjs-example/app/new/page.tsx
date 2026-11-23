import type { Metadata } from "next";

// 브라우저 탭·검색 엔진용 정보와 링크 공유(Open Graph)용 정보를 따로 설정한다
export const metadata: Metadata = {
  title: "새 페이지 | Next.js",
  description: "테스트로 만들어 본 새 페이지예요.",
  openGraph: {
    title: "Next.js 연습장",
    description: "작은 예제로 Next.js를 배워요.",
    images: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3"],
  },
};

export default function NewPage() {
  return <div>This is New Page.</div>;
}

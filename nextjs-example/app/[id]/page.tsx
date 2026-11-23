import { Suspense } from "react";

interface DynamicPageProps {
  params: Promise<{ id: string }>;
}

// Cache Components가 켜져 있어서, 요청 뒤에 알 수 있는 params는 Suspense 경계 안에서 읽는다
export default function DynamicPage({ params }: DynamicPageProps) {
  return (
    <Suspense fallback={<div>DynamicPageLoading...</div>}>
      <DynamicPageScreen params={params} />
    </Suspense>
  );
}

async function DynamicPageScreen({ params }: DynamicPageProps) {
  const { id } = await params;

  return <div>This is Dynamic Page. Current id is {id}.</div>;
}

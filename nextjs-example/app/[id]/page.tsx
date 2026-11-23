import { Suspense } from "react";

interface DynamicPageProps {
  params: Promise<{ id: string }>;
}

interface Todo {
  title: string;
}

// Cache Components가 켜져 있어서, 요청 뒤에 알 수 있는 params는 Suspense 경계 안에서 읽는다
export default function DynamicPage({ params }: DynamicPageProps) {
  return (
    <Suspense fallback={<div>DynamicPageLoading...</div>}>
      <DynamicPageScreen params={params} />
    </Suspense>
  );
}

// Server Component는 async 함수로 만들어 서버에서 API 응답을 기다린 뒤 화면을 만든다
async function DynamicPageScreen({ params }: DynamicPageProps) {
  const { id } = await params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
  );

  if (!response.ok) {
    throw new Error("할 일을 불러오지 못했어요.");
  }

  const todo: Todo = await response.json();

  return (
    <div>
      <h1>Todo {id}</h1>
      <p>{todo.title}</p>
    </div>
  );
}

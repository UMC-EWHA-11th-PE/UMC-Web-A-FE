"use client";

// 클릭에 반응해야 하는 버튼만 Client Component로 분리한다
export default function AlertButton() {
  return <button onClick={() => alert("Hello, Next.js!")}>Click Me</button>;
}

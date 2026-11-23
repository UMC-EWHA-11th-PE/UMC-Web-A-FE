import AlertButton from "./components/alert-button";

// 페이지는 Server Component로 두고, 상호작용이 필요한 버튼만 불러온다
export default function HomePage() {
  return (
    <div>
      <h1>This is Home Page.</h1>
      <AlertButton />
    </div>
  );
}

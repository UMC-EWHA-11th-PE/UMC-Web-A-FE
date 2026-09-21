

import { Header } from "./components/header";





export default function App() {

  return (
    <main>
      <Header
        isLoggedIn={true}
      />
      <h1>영화 목록</h1>

    </main>
  );
}
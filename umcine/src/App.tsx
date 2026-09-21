import { createContext, useContext, useState } from "react";

// 1. StudyMode 타입을 "focus" | "break"로 만들기
type StudyMode = "focus" | "break";

// 2. 기본값이 "focus"인 Context 만들기
const StudyModeContext = createContext<StudyMode>("focus");

// 3. 자식 컴포넌트에서 useContext 또는 use로 현재 모드 읽기
function StudyModeStatus() {
  const studyMode = useContext(StudyModeContext);

  return <p>현재 공부 모드: {studyMode}</p>;  
}

// 4. 부모의 버튼으로 모드를 바꾸고 자식 화면도 바뀌기
export default function App() {
  const [studyMode, setStudyMode] = useState<StudyMode>("focus");

  function handleToggleTheme() {
    setStudyMode((currentMode) =>
      currentMode === "focus" ? "break" : "focus",
    );
  }

  return (
    <StudyModeContext value={studyMode}>
      <StudyModeStatus />
      <button onClick={handleToggleTheme}>
        공부 모드 바꾸기
      </button>
    </StudyModeContext>
  );
}
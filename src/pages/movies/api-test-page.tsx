import { useState } from "react";

export function ApiTestPage() {
  const [nicknameResult, setNicknameResult] = useState("");
  const [emailResult, setEmailResult] = useState("");
  const [ratingResult, setRatingResult] = useState("");

  async function checkNickname() {
    const response = await fetch(
      "http://localhost:8080/members/nickname/noco"
    );

    const data = await response.json();
    setNicknameResult(JSON.stringify(data, null, 2));
  }

  async function checkEmail() {
    const response = await fetch(
      "http://localhost:8080/members/email/noco@umc.com"
    );

    const data = await response.json();
    setEmailResult(JSON.stringify(data, null, 2));
  }

  async function getRatings() {
    const response = await fetch(
      "http://localhost:8080/members/1/ratings"
    );

    const data = await response.json();
    setRatingResult(JSON.stringify(data, null, 2));
  }

  return (
    <main className="mx-auto max-w-[1000px] px-5 py-10">
      <h1 className="mb-8 text-2xl font-bold">
        백엔드 API 연결 테스트
      </h1>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold">
          닉네임 중복 확인
        </h2>

        <button
          onClick={checkNickname}
          className="rounded bg-[#1b1d2e] px-4 py-2 text-white"
        >
          noco 중복 확인
        </button>

        <pre className="mt-3 rounded bg-gray-100 p-4">
          {nicknameResult}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold">
          이메일 중복 확인
        </h2>

        <button
          onClick={checkEmail}
          className="rounded bg-[#1b1d2e] px-4 py-2 text-white"
        >
          noco@umc.com 중복 확인
        </button>

        <pre className="mt-3 rounded bg-gray-100 p-4">
          {emailResult}
        </pre>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">
          1번 유저 평점 조회
        </h2>

        <button
          onClick={getRatings}
          className="rounded bg-[#1b1d2e] px-4 py-2 text-white"
        >
          평점 조회
        </button>

        <pre className="mt-3 whitespace-pre-wrap rounded bg-gray-100 p-4">
          {ratingResult}
        </pre>
      </section>
    </main>
  );
}
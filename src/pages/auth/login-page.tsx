import { useState, type SubmitEvent } from "react";
import { Link } from "@tanstack/react-router";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    password.length > 0;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFormValid) return;

    alert("입력 확인 완료! 실제 로그인 API는 아직 연결되지 않았어요.");
  }

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#f8f9fa] px-5 py-12">
      <div className="w-full max-w-[360px]">
        <h1 className="mb-6 text-2xl font-bold text-[#111111]">
          로그인
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="login-email"
              className="mb-2 block text-xs font-bold text-[#111111]"
            >
              이메일
            </label>

            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#4b63e6]"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="login-password"
              className="mb-2 block text-xs font-bold text-[#111111]"
            >
              비밀번호
            </label>

            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력해 주세요."
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#4b63e6]"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full rounded-md bg-[#4b63e6] py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            로그인
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          아직 계정이 없나요?{" "}
          <Link to="/signup" className="font-semibold text-[#4b63e6]">
            회원가입
          </Link>
        </p>
      </div>
    </main>
  );
}

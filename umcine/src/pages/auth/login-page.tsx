import { useState, type SubmitEvent } from "react";
import { Link } from "@tanstack/react-router";
import { FormField, InputBox } from "../../components/auth/form-field";
import { INPUT_CLASS_NAME } from "../../components/auth/form-field-styles";

const DEFAULT_FORM = {
  email: "",
  password: "",
};

type LoginFormKey = keyof typeof DEFAULT_FORM;

export function LoginPage() {
  const [form, setForm] = useState(DEFAULT_FORM);

  const handleChangeField = (key: LoginFormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 로그인 API 연결은 8주차에서 진행
  };

  return (
    // Figma: 회원가입과 같은 430px 폼, 화면 가운데 배치
    <main className="flex items-center justify-center px-4 py-16">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-[430px] flex-col gap-5"
      >
        <h1 className="mb-1 text-[32px] leading-[38px] font-bold tracking-[-1px] text-fg">
          로그인
        </h1>

        <FormField id="login-email" label="이메일">
          <InputBox hasError={false}>
            <InputIcon src="/icons/mail.svg" />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(event) => handleChangeField("email", event.target.value)}
              className={INPUT_CLASS_NAME}
            />
          </InputBox>
        </FormField>

        <FormField id="login-password" label="비밀번호">
          <InputBox hasError={false}>
            <InputIcon src="/icons/lock.svg" />
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호"
              value={form.password}
              onChange={(event) => handleChangeField("password", event.target.value)}
              className={INPUT_CLASS_NAME}
            />
          </InputBox>
        </FormField>

        <button
          type="submit"
          className="h-12 w-full cursor-pointer rounded-lg bg-action text-sm font-extrabold text-white hover:bg-action-hover active:bg-action-pressed"
        >
          로그인
        </button>

        <p className="text-center text-xs leading-4 text-fg-secondary">
          계정이 없으신가요?{" "}
          <Link to="/signup" className="font-bold text-action">
            회원가입
          </Link>
        </p>
      </form>
    </main>
  );
}

// Figma: 입력칸 왼쪽의 회색 아이콘. svg가 검정색이라 마스크로 쓰고 tertiary 색을 입힘
function InputIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ maskImage: `url('${src}')` }}
      className="size-[18px] shrink-0 bg-fg-tertiary mask-contain mask-center mask-no-repeat"
    />
  );
}

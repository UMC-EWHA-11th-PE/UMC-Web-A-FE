"use client";
import { useState, type FormEvent } from "react";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { useSignupMutation } from "../../hooks/use-signup-mutation";

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

type DuplicateCheckKey = "email" | "nickname";
type FormField = keyof typeof DEFAULT_FORM;

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });

  const signupMutation = useSignupMutation();

  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const nicknameLength = form.nickname.trim().length;
  const isNicknameValid = nicknameLength >= 2 && nicknameLength <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  const canSubmit =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit || signupMutation.isPending) return;

    signupMutation.mutate({
      email: form.email.trim(),
      nickname: form.nickname.trim(),
      password: form.password,
    });
  };

  const handleChangeField = (key: FormField, value: string) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;

      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: DEFAULT_DUPLICATE_CHECK,
      }));
    }

    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;
    if (!isValid || duplicateCheck[key].isChecking) return;

    const label = key === "email" ? "이메일" : "닉네임";

    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { isChecking: true, isAvailable: false },
    }));

    try {
      const response =
        key === "email"
          ? await checkEmailDuplicate(form.email.trim())
          : await checkNicknameDuplicate(form.nickname.trim());

      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { isChecking: false, isAvailable: response.available },
      }));

      alert(
        response.available
          ? `사용할 수 있는 ${label}이에요.`
          : `이미 사용 중인 ${label}이에요.`,
      );
    } catch (error) {
      console.error("중복 확인 오류:", error);

      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: DEFAULT_DUPLICATE_CHECK,
      }));

      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    }
  };

  const inputClass =
    "h-12 w-full rounded-lg border bg-white px-4 text-sm text-gray-900 " +
    "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const getInputClass = (hasError: boolean) =>
    `${inputClass} ${hasError ? "border-red-500" : "border-gray-200"}`;

  return (
    <main className="flex min-h-[calc(100dvh-90px)] items-center justify-center bg-[#f5f6f8] px-5 py-16">
      <section className="w-full max-w-[420px]" aria-labelledby="signup-title">
        <h1
          id="signup-title"
          className="mb-5 text-3xl font-bold tracking-tight text-gray-900"
        >
          회원가입
        </h1>

        <form noValidate className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              이메일
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={(event) =>
                  handleChangeField("email", event.target.value)
                }
                className={`${getInputClass(showEmailError)} pr-24`}
                aria-invalid={showEmailError}
                aria-describedby={showEmailError ? "email-error" : undefined}
              />
              <button
                type="button"
                disabled={!isEmailValid || duplicateCheck.email.isChecking}
                onClick={() => handleCheckDuplicate("email")}
                className="absolute inset-y-0 right-4 text-xs font-semibold text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {showEmailError && (
              <p id="email-error" className="mt-1 text-xs text-red-500">
                올바른 이메일 형식을 입력해 주세요.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="nickname"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              닉네임
            </label>
            <div className="relative">
              <input
                id="nickname"
                name="nickname"
                type="text"
                autoComplete="nickname"
                placeholder="2~12자"
                value={form.nickname}
                onChange={(event) =>
                  handleChangeField("nickname", event.target.value)
                }
                className={`${getInputClass(showNicknameError)} pr-24`}
                aria-invalid={showNicknameError}
                aria-describedby={
                  showNicknameError ? "nickname-error" : undefined
                }
              />
              <button
                type="button"
                disabled={
                  !isNicknameValid || duplicateCheck.nickname.isChecking
                }
                onClick={() => handleCheckDuplicate("nickname")}
                className="absolute inset-y-0 right-4 text-xs font-semibold text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {showNicknameError && (
              <p id="nickname-error" className="mt-1 text-xs text-red-500">
                닉네임은 2~12자로 입력해 주세요.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="8자 이상"
              value={form.password}
              onChange={(event) =>
                handleChangeField("password", event.target.value)
              }
              className={getInputClass(showPasswordError)}
              aria-invalid={showPasswordError}
              aria-describedby="password-help"
            />
            <p
              id="password-help"
              className={`mt-1 text-[11px] ${
                showPasswordError ? "text-red-500" : "text-gray-400"
              }`}
            >
              영문 대소문자, 숫자, 특수문자(!@#$%^&amp;*)를 모두 포함해 8자 이상
              입력해 주세요.
            </p>
          </div>

          <div>
            <label
              htmlFor="passwordConfirm"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              placeholder="다시 입력"
              value={form.passwordConfirm}
              onChange={(event) =>
                handleChangeField("passwordConfirm", event.target.value)
              }
              className={getInputClass(showPasswordConfirmError)}
              aria-invalid={showPasswordConfirmError}
              aria-describedby={
                showPasswordConfirmError ? "password-confirm-error" : undefined
              }
            />
            {showPasswordConfirmError && (
              <p
                id="password-confirm-error"
                className="mt-1 text-xs text-red-500"
              >
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit || signupMutation.isPending}
            className="h-12 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {signupMutation.isPending ? "가입 중" : "가입하기"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          이미 계정이 있나요?{" "}
          <a
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            로그인
          </a>
        </p>
      </section>
    </main>
  );
}

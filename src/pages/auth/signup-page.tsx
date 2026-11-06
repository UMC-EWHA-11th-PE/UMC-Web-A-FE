import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { signup } from "../../api/members/signup";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type FormKey = keyof typeof DEFAULT_FORM;
type DuplicateCheckKey = "email" | "nickname";

export function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: { ...DEFAULT_DUPLICATE_CHECK },
    nickname: { ...DEFAULT_DUPLICATE_CHECK },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid =
    form.nickname.trim().length >= 2 &&
    form.nickname.trim().length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 &&
    form.password === form.passwordConfirm;

  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;

  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  function handleChangeField(key: FormKey, value: string) {
    if (
      (key === "email" || key === "nickname") &&
      duplicateCheck[key].isChecking
    ) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (key === "email" || key === "nickname") {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...DEFAULT_DUPLICATE_CHECK },
      }));
    }
  }

  async function handleCheckDuplicate(key: DuplicateCheckKey) {
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
    } catch {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { isChecking: false, isAvailable: false },
      }));

      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    }
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await signup({
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password,
      });

      if (!response.isSuccess) {
        alert(response.message || "회원가입에 실패했어요.");
        return;
      }

      alert(response.message);
      navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-md border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#4b63e6]";

  const labelClass = "mb-2 block text-xs font-bold text-[#111111]";

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#f8f9fa] px-5 py-12">
      <div className="w-full max-w-[360px]">
        <h1 className="mb-6 text-2xl font-bold text-[#111111]">
          회원가입
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="signup-email" className={labelClass}>
              이메일
            </label>

            <div className="flex overflow-hidden rounded-md border border-gray-200 bg-white focus-within:border-[#4b63e6]">
              <input
                id="signup-email"
                type="email"
                value={form.email}
                disabled={duplicateCheck.email.isChecking}
                onChange={(event) =>
                  handleChangeField("email", event.target.value)
                }
                placeholder="name@example.com"
                className="min-w-0 flex-1 px-3 py-3 text-sm outline-none"
              />

              <button
                type="button"
                disabled={!isEmailValid || duplicateCheck.email.isChecking}
                onClick={() => handleCheckDuplicate("email")}
                className="px-3 text-xs font-semibold text-[#4b63e6] disabled:cursor-not-allowed disabled:text-gray-300"
              >
                {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>

            {form.email && !isEmailValid && (
              <p className="mt-1 text-xs text-red-500">
                올바른 이메일 형식을 입력해 주세요.
              </p>
            )}

            {duplicateCheck.email.isAvailable && (
              <p className="mt-1 text-xs text-green-600">
                사용 가능한 이메일이에요.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="signup-nickname" className={labelClass}>
              닉네임
            </label>

            <div className="flex overflow-hidden rounded-md border border-gray-200 bg-white focus-within:border-[#4b63e6]">
              <input
                id="signup-nickname"
                type="text"
                value={form.nickname}
                disabled={duplicateCheck.nickname.isChecking}
                onChange={(event) =>
                  handleChangeField("nickname", event.target.value)
                }
                placeholder="2~12자"
                className="min-w-0 flex-1 px-3 py-3 text-sm outline-none"
              />

              <button
                type="button"
                disabled={
                  !isNicknameValid || duplicateCheck.nickname.isChecking
                }
                onClick={() => handleCheckDuplicate("nickname")}
                className="px-3 text-xs font-semibold text-[#4b63e6] disabled:cursor-not-allowed disabled:text-gray-300"
              >
                {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>

            {form.nickname && !isNicknameValid && (
              <p className="mt-1 text-xs text-red-500">
                닉네임은 2~12자로 입력해 주세요.
              </p>
            )}

            {duplicateCheck.nickname.isAvailable && (
              <p className="mt-1 text-xs text-green-600">
                사용 가능한 닉네임이에요.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="signup-password" className={labelClass}>
              비밀번호
            </label>

            <input
              id="signup-password"
              type="password"
              value={form.password}
              onChange={(event) =>
                handleChangeField("password", event.target.value)
              }
              placeholder="8자 이상"
              className={inputClass}
            />

            <p className="mt-1 text-[11px] text-gray-400">
              영문 대소문자, 숫자, 특수문자를 모두 포함한 8자 이상
            </p>

            {form.password && !isPasswordValid && (
              <p className="mt-1 text-xs text-red-500">
                비밀번호 조건을 확인해 주세요.
              </p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="signup-confirm" className={labelClass}>
              비밀번호 확인
            </label>

            <input
              id="signup-confirm"
              type="password"
              value={form.passwordConfirm}
              onChange={(event) =>
                handleChangeField("passwordConfirm", event.target.value)
              }
              placeholder="다시 입력"
              className={inputClass}
            />

            {form.passwordConfirm && !isPasswordConfirmValid && (
              <p className="mt-1 text-xs text-red-500">
                비밀번호가 일치하지 않아요.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="w-full rounded-md bg-[#4b63e6] py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "가입 중" : "가입하기"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          이미 계정이 있나요?{" "}
          <Link to="/login" className="font-semibold text-[#4b63e6]">
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}

import { useState, type ReactNode, type SubmitEvent } from "react";
import { cn } from "../../utils/cn";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";

// 이메일 형식 검사
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DuplicateCheckKey = "email" | "nickname";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });

  // 입력값의 유효성 검사
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid =
    form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  // 입력을 시작한 필드에만 오류 표시
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  // 모든 입력값이 유효하면 제출 버튼 활성화
  const isFormValid =
    isEmailValid && isNicknameValid && isPasswordValid && isPasswordConfirmValid;

  // 입력 조건과 두 중복 확인을 모두 통과해야 제출 가능
  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;
      // 확인한 값을 바꾸면 다시 중복 확인해야 함
      setDuplicateCheck((prev) => ({ ...prev, [key]: DEFAULT_DUPLICATE_CHECK }));
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
      const isAvailable = response.available;
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable },
      }));
      alert(
        isAvailable
          ? `사용할 수 있는 ${label}이에요.`
          : `이미 사용 중인 ${label}이에요.`,
      );
    } catch {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable: false },
      }));
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isChecking: false },
      }));
    }
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    // 폼 제출 시 페이지 새로고침 방지
    event.preventDefault();

    // 3.4에서 회원가입 API 요청 추가
  };

  return (
    // Figma: 폼 너비 430px, 화면 가운데 배치
    <main className="flex items-center justify-center px-4 py-16">
      {/* noValidate는 폼 제출 시 브라우저의 기본 유효성 검사를 끔 */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-[430px] flex-col gap-5"
      >
        <h1 className="mb-1 text-[32px] leading-[38px] font-bold tracking-[-1px] text-fg">
          회원가입
        </h1>

        <FormField
          id="signup-email"
          label="이메일"
          error={showEmailError ? "올바른 이메일 형식이 아니에요." : undefined}
        >
          <InputBox hasError={showEmailError}>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(event) => handleChangeField("email", event.target.value)}
              disabled={duplicateCheck.email.isChecking}
              className={INPUT_CLASS_NAME}
            />
            <button
              type="button"
              disabled={!isEmailValid || duplicateCheck.email.isChecking}
              onClick={() => handleCheckDuplicate("email")}
              className={CHECK_BUTTON_CLASS_NAME}
            >
              {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </InputBox>
        </FormField>

        <FormField
          id="signup-nickname"
          label="닉네임"
          error={showNicknameError ? "닉네임은 2~12자로 입력해 주세요." : undefined}
        >
          <InputBox hasError={showNicknameError}>
            <input
              id="signup-nickname"
              type="text"
              autoComplete="nickname"
              placeholder="2~12자"
              value={form.nickname}
              onChange={(event) => handleChangeField("nickname", event.target.value)}
              disabled={duplicateCheck.nickname.isChecking}
              className={INPUT_CLASS_NAME}
            />
            <button
              type="button"
              disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
              onClick={() => handleCheckDuplicate("nickname")}
              className={CHECK_BUTTON_CLASS_NAME}
            >
              {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </InputBox>
        </FormField>

        <FormField
          id="signup-password"
          label="비밀번호"
          // Figma: 비밀번호 칸 아래 조건 안내. 조건을 못 맞추면 같은 문구를 빨간색으로 보여줌
          hint="영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요."
          error={
            showPasswordError
              ? "영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요."
              : undefined
          }
        >
          <InputBox hasError={showPasswordError}>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              placeholder="8자 이상"
              value={form.password}
              onChange={(event) => handleChangeField("password", event.target.value)}
              className={INPUT_CLASS_NAME}
            />
          </InputBox>
        </FormField>

        <FormField
          id="signup-password-confirm"
          label="비밀번호 확인"
          error={showPasswordConfirmError ? "비밀번호가 일치하지 않아요." : undefined}
        >
          <InputBox hasError={showPasswordConfirmError}>
            <input
              id="signup-password-confirm"
              type="password"
              autoComplete="new-password"
              placeholder="다시 입력"
              value={form.passwordConfirm}
              onChange={(event) => handleChangeField("passwordConfirm", event.target.value)}
              className={INPUT_CLASS_NAME}
            />
          </InputBox>
        </FormField>

        <button
          type="submit"
          disabled={!canSubmit}
          className="h-12 w-full cursor-pointer rounded-lg bg-action text-sm font-extrabold text-white hover:bg-action-hover active:bg-action-pressed disabled:cursor-not-allowed disabled:bg-action-disabled"
        >
          가입하기
        </button>

        <p className="text-center text-xs leading-4 text-fg-secondary">
          이미 계정이 있나요?{" "}
          {/* 로그인 페이지는 필수 미션에서 만든 뒤 Link로 연결 */}
          <span className="font-bold text-action">로그인</span>
        </p>
      </form>
    </main>
  );
}

// Figma: 48px 높이 입력칸 안쪽 글자
const INPUT_CLASS_NAME =
  "h-full min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-tertiary";

// Figma: 입력칸 오른쪽 안의 파란 글자 버튼
const CHECK_BUTTON_CLASS_NAME =
  "shrink-0 cursor-pointer text-xs font-bold text-action disabled:cursor-not-allowed disabled:text-fg-tertiary";

interface FormFieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

// 라벨 + 입력칸 + (안내 또는 오류 문구) 한 묶음
function FormField({ id, label, hint, error, children }: FormFieldProps) {
  const message = error ?? hint;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] leading-4 font-bold text-fg">
        {label}
      </label>
      {children}
      {message && (
        <p className={cn("text-[11px] leading-4", error ? "text-danger" : "text-fg-tertiary")}>
          {message}
        </p>
      )}
    </div>
  );
}

// Figma: 흰 배경, 1px 테두리, radius 8px. 입력 중에는 파란 테두리, 오류일 때는 빨간 테두리
function InputBox({ hasError, children }: { hasError: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex h-12 items-center gap-3 rounded-lg border bg-surface px-4",
        hasError ? "border-danger" : "border-line focus-within:border-action",
      )}
    >
      {children}
    </div>
  );
}

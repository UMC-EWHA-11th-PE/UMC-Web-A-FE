import { useState } from "react";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate.ts";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate.ts";
import { signup } from "../../api/members/signup.ts";
import { Link } from "@tanstack/react-router";

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

const DEFAULT_DUPLICATE_CHECK = {
    isChecking: false,
    isAvailable: false,
}

type DuplicateCheckKey = "email" | "nickname";

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];

const LABEL_CLASS = "text-[13px] font-extrabold leading-[normal]";
const INPUT_CLASS =
    "min-w-0 flex-1 bg-transparent px-[2px] py-px text-sm leading-[normal] outline-none placeholder:text-(--color-text-tertiary)";
const CHECK_BUTTON_CLASS =
    "shrink-0 text-xs font-extrabold leading-[normal] text-(--color-action-primary)";
const ERROR_CLASS =
    "text-[11px] leading-[normal] text-(--color-danger-default)";

// 오류가 있는 입력칸은 테두리를 빨간색으로 표시
function getFieldClass(hasError: boolean) {
    const borderColor = hasError
        ? "border-(--color-danger-default)"
        : "border-(--color-border-default) focus-within:border-(--color-action-primary)";

    return `flex min-h-12 items-center gap-[9px] rounded-lg border bg-(--color-bg-surface) px-[13px] py-[14px] ${borderColor}`;
}

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

    // 모든 입력값이 유효한지 확인
    const isFormValid=
        isEmailValid &&
        isNicknameValid &&
        isPasswordValid &&
        isPasswordConfirmValid;

    const canSubmit=
        isFormValid &&
        duplicateCheck.email.isAvailable &&
        duplicateCheck.nickname.isAvailable;

    // 입력을 시작한 필드에만 오류 표시
    const showEmailError = form.email.length > 0 && !isEmailValid;
    const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
    const showPasswordError = form.password.length > 0 && !isPasswordValid;
    const showPasswordConfirmError =
        form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

    const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
        if(key==="email"||key==="nickname"){
            if (duplicateCheck[key].isChecking) return;
            setDuplicateCheck((prev)=>({...prev, [key]: DEFAULT_DUPLICATE_CHECK}));
        }
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
        const isValid=key==="email"?isEmailValid:isNicknameValid;
        if(!isValid||duplicateCheck[key].isChecking) return;

        const label=key==="email"?"이메일":"닉네임";
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

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>) => {
        // 폼 제출 시 페이지 새로고침 방지
        e.preventDefault()
        if(!canSubmit || isSubmitting) return;

        setIsSubmitting(true);

        try{
            const response = await signup({
                email: form.email.trim(),
                nickname: form.nickname.trim(),
                password: form.password,
            });

            alert(response.message);
        } catch {
            alert("회원가입에 실패했어요. 다시 시도해 주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // noValidate는 폼 제출 시 브라우저의 기본 유효성 검사를 끔
    return (
        <main className="flex flex-1 items-center justify-center px-4 py-10">
            <form
                onSubmit={handleSubmit}
                noValidate
                className="flex w-full max-w-[430px] flex-col gap-4"
            >
                <h1 className="text-[34px] font-bold leading-[normal] tracking-[-1.53px]">회원가입</h1>

                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="signup-email" className={LABEL_CLASS}>이메일</label>
                        <div className={getFieldClass(showEmailError)}>
                            <input
                                id="signup-email"
                                type="email"
                                placeholder="name@example.com"
                                className={INPUT_CLASS}
                                value={form.email}
                                onChange={(e)=>handleChangeField("email", e.target.value)}
                            />
                            <button
                                type="button"
                                className={CHECK_BUTTON_CLASS}
                                onClick={()=>handleCheckDuplicate("email")}
                                disabled={!isEmailValid||duplicateCheck.email.isChecking}
                            >
                                {duplicateCheck.email.isChecking?"확인 중":"중복 확인"}
                            </button>
                        </div>
                    </div>
                    {showEmailError && <p className={ERROR_CLASS}>올바른 이메일 형식을 입력해주세요.</p>}
                </div>


                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="signup-nickname" className={LABEL_CLASS}>닉네임</label>
                        <div className={getFieldClass(showNicknameError)}>
                            <input
                                id="signup-nickname"
                                type="text"
                                placeholder="2–12자"
                                className={INPUT_CLASS}
                                value={form.nickname}
                                onChange={(e)=>handleChangeField("nickname", e.target.value)}
                            />
                            <button
                                type="button"
                                className={CHECK_BUTTON_CLASS}
                                onClick={()=>handleCheckDuplicate("nickname")}
                                disabled={!isNicknameValid||duplicateCheck.nickname.isChecking}
                            >
                                {duplicateCheck.nickname.isChecking?"확인 중":"중복 확인"}
                            </button>
                        </div>
                    </div>
                    {showNicknameError && <p className={ERROR_CLASS}>2자 이상 12자 이하로 입력해주세요.</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="signup-password" className={LABEL_CLASS}>비밀번호</label>
                        <div className={getFieldClass(showPasswordError)}>
                            <input
                                id="signup-password"
                                type="password"
                                placeholder="8자 이상"
                                className={INPUT_CLASS}
                                value={form.password}
                                onChange={(e)=>handleChangeField("password", e.target.value)}
                            />
                        </div>
                    </div>
                    {/* 평소에는 안내 문구, 오류일 때는 오류 메시지 표시 */}
                    {showPasswordError ? (
                        <p className={ERROR_CLASS}>영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 포함해 8자 이상 입력해주세요.</p>
                    ) : (
                        <p className="text-[11px] leading-[normal] text-(--color-text-tertiary)">
                            영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="signup-password-confirm" className={LABEL_CLASS}>비밀번호 확인</label>
                        <div className={getFieldClass(showPasswordConfirmError)}>
                            <input
                                id="signup-password-confirm"
                                type="password"
                                placeholder="다시 입력"
                                className={INPUT_CLASS}
                                value={form.passwordConfirm}
                                onChange={(e)=>handleChangeField("passwordConfirm", e.target.value)}
                            />
                        </div>
                    </div>
                    {showPasswordConfirmError && <p className={ERROR_CLASS}>비밀번호가 일치하지 않습니다.</p>}
                </div>

                <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="flex h-12 items-center justify-center rounded-lg border border-(--color-bg-surface) bg-(--color-action-primary) px-4 text-sm font-extrabold leading-[normal] text-(--color-bg-surface) hover:bg-(--color-action-hover) active:bg-(--color-action-pressed) disabled:cursor-not-allowed disabled:bg-(--color-action-disabled)"
                >
                    가입하기
                </button>

                <div className="flex items-end justify-center">
                    <p className="whitespace-pre text-[13px] leading-[normal] text-(--color-text-secondary)">이미 계정이 있나요? </p>
                    <Link to="/login" className="text-xs font-extrabold leading-[normal] text-(--color-action-primary)">로그인</Link>
                </div>
            </form>
        </main>
    )
}

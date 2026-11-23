import {useState} from "react";
import {Link} from "@tanstack/react-router";
import {getApiErrorMessage} from "../../utils/get-api-error-message.ts";
import {useLoginMutation} from "../../hooks/use-login-mutation.ts";

const DEFAULT_FORM = {
    email: "",
    password: "",
};

type LoginFormKey = keyof typeof DEFAULT_FORM;

const LABEL_CLASS = "text-[13px] font-extrabold leading-[normal]";
const FIELD_CLASS =
    "flex min-h-12 items-center gap-[9px] rounded-lg border border-(--color-border-default) bg-(--color-bg-surface) px-[13px] py-[14px] focus-within:border-(--color-action-primary)";
const INPUT_CLASS =
    "min-w-0 flex-1 bg-transparent px-[2px] py-px text-sm leading-[normal] outline-none placeholder:text-(--color-text-tertiary)";
const ERROR_CLASS = "text-[11px] leading-[normal] text-(--color-danger-default)";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
    const [form, setForm] = useState(DEFAULT_FORM);
    const loginMutation=useLoginMutation();
    const canSubmit=EMAIL_REGEX.test(form.email.trim())&&form.password.length>0;

    const handleChangeField=(key:LoginFormKey, value:string)=>{
        setForm((prev)=>({...prev, [key]:value}));
    };

    const handleSubmit=(event: React.SubmitEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(!canSubmit||loginMutation.isPending) return;
        loginMutation.mutate({
            email: form.email.trim(),
            password: form.password,
        });
    };

    return (
        <main className="flex flex-1 items-center justify-center px-4 py-10">
            <form
                onSubmit={handleSubmit}
                noValidate
                className="flex w-full max-w-[430px] flex-col gap-4"
            >
                <h1 className="text-[34px] font-bold leading-[normal] tracking-[-1.53px]">로그인</h1>

                <div className="flex flex-col gap-2">
                    <label htmlFor="login-email" className={LABEL_CLASS}>이메일</label>
                    <div className={FIELD_CLASS}>
                        <input
                            id="login-email"
                            type="email"
                            autoComplete="email"
                            placeholder="name@example.com"
                            className={INPUT_CLASS}
                            value={form.email}
                            onChange={(e) => handleChangeField("email", e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="login-password" className={LABEL_CLASS}>비밀번호</label>
                    <div className={FIELD_CLASS}>
                        <input
                            id="login-password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="비밀번호 입력"
                            className={INPUT_CLASS}
                            value={form.password}
                            onChange={(e) => handleChangeField("password", e.target.value)}
                        />
                    </div>
                </div>

                {loginMutation.isError && (
                    <p className={ERROR_CLASS}>
                        {getApiErrorMessage(loginMutation.error, "로그인에 실패했어요. 다시 시도해 주세요.")}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={!canSubmit || loginMutation.isPending}
                    className="flex h-12 items-center justify-center rounded-lg border border-(--color-bg-surface) bg-(--color-action-primary) px-4 text-sm font-extrabold leading-[normal] text-(--color-bg-surface) hover:bg-(--color-action-hover) active:bg-(--color-action-pressed) disabled:cursor-not-allowed disabled:bg-(--color-action-disabled)"
                >
                    {loginMutation.isPending ? "로그인 중" : "로그인"}
                </button>

                <div className="flex items-end justify-center">
                    <p className="whitespace-pre text-[13px] leading-[normal] text-(--color-text-secondary)">아직 계정이
                        없나요? </p>
                    <Link to="/signup"
                          className="text-xs font-extrabold leading-[normal] text-(--color-action-primary)">회원가입</Link>
                </div>
            </form>
        </main>
    );
}

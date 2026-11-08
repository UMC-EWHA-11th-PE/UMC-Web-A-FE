import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { useState } from "react";

const DEFAULT_DUPLICATE_CHECK = {
	isChecking: false,
	isAvailable: false,
}

type DuplicateCheckKey = "email" | "nickname";


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



export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);

	const [duplicateCheck, setDuplicateCheck] = useState({
		email: DEFAULT_DUPLICATE_CHECK,
		nickname: DEFAULT_DUPLICATE_CHECK,
	})

  // 입력값의 유효성 검사
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid = form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid = form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  // 입력을 시작한 필드에만 오류 표시
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError = form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  // 모든 입력값이 유효하면 제출 버튼 활성화
  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;

	//입력 조건과 두 중복 확인을 모두 통과해야 제출 가능
	const canSubmit = 
		isFormValid &&
		duplicateCheck.email.isAvailable &&
		duplicateCheck.nickname.isAvailable;

  const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
		if(key==="email" || key==="nickname") {
			if(duplicateCheck[key].isChecking) return;
			//확인한 값을 바꾸면 다시 중복 확인해야 함
			setDuplicateCheck((prev) => ({ ...prev, [key]: DEFAULT_DUPLICATE_CHECK }))
		}
    setForm((prev) => ({ ...prev, [key]: value }));
  };



	const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
		const isValid = key === "email" ? isEmailValid : isNicknameValid;
		
		if(!isValid || duplicateCheck[key].isChecking) return;

		const label = key === "email" ? "이메일" : "닉네임";
		setDuplicateCheck((prev) => ({
			...prev,
			[key]: { isChecking: true, isAvailable: false },
		}));

		try {
			const response = 
				key ==="email"
				? await checkEmailDuplicate(form.email.trim())
				: await checkNicknameDuplicate(form.nickname.trim());
			
			const isAvailable = response.available;
			setDuplicateCheck((prev) => ({
				...prev,
				[key]: {...prev[key], isAvailable},
			}));

			alert(
				isAvailable
				? `사용할 수 있는 ${label}이에요.`
				: `이미 사용 중인 ${label}이에요.`
			);

		} 
		
		catch {
			setDuplicateCheck((prev) => ({
				...prev,
				[key]: { ...prev[key], isAvailable: false },
			}));
			
			alert("중복 확인에 실패했어요. 다시 시도해주세요.");
		}

		finally {
			setDuplicateCheck((prev) => ({
				...prev,
				[key]: { ...prev[key], isChecking: false }
			}));
		}
	};


  
  const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
	  // 폼 제출 시 페이지 새로고침 방지
    e.preventDefault()
    
    // 3.4에서 회원가입 API 요청 추가
  };
  
  // noValidate는 폼 제출 시 브라우저의 기본 유효성 검사를 끔
  return (
		<div className="flex flex-col items-center w-full">
			<form 
					onSubmit={handleSubmit} noValidate
					className="flex flex-col mt-30 w-[480px] gap-[16px] text-left"
			>

				<h1 className="text-[34px] font-bold">회원가입</h1>
			


				<div className="flex flex-col gap-2  w-full">
					<p className="text-[13px] font-extrabold">이메일</p>
					<div className="flex h-[49px] items-center border rounded-[8px] px-[13px] py-[14px] bg-white border-[#E3E6EB] w-full gap-2">
							<input
								id="email"
								type="email"
								value={form.email}
								onChange={(e) => handleChangeField("email", e.target.value)}
								placeholder="name@example.com"
								className="flex-1 min-w-0 h-full bg-transparent"
							/>
							<button 
								type="button"
								disabled={ !isEmailValid || duplicateCheck.email.isChecking }
								onClick={() => handleCheckDuplicate("email")}
								className="text-[12px] font-extrabold text-[#2563EB] h-[14px] shrink-0 whitespace-nowrap"
							>
								{duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
							</button>
					</div>

					{showEmailError && (
						<p className="text-[11px] font-regular text-[#D92D20]">이메일 형식을 확인해주세요.</p>
					)}

				</div>



				<div className="flex flex-col gap-2  w-full">
					<p className="text-[13px] font-extrabold">닉네임</p>
					<div className="flex h-[49px] items-center justify-between border rounded-[8px] px-[13px] py-[14px] bg-white border-[#E3E6EB] w-full">
							<input
								id="nickname"
								type="text"
								value={form.nickname}
								onChange={(e) => handleChangeField("nickname", e.target.value)}
								placeholder="2-12자"
								className="flex-1 min-w-0 bg-transparent"
							/>
							<button 
								type="button"
								disabled={ !isNicknameValid || duplicateCheck.nickname.isChecking }
								onClick={() => handleCheckDuplicate("nickname")}
								className="text-[12px] font-extrabold text-[#2563EB] w-[45px] h-[14px] shrink-0 "
							>
								{duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
							</button>
					</div>

					{showNicknameError && (
						<p className="text-[11px] font-regular text-[#D92D20]">닉네임은 2-12자로 입력해 주세요</p>
					)}

				</div>




				<div className="flex flex-col gap-2  w-full">
					<p className="text-[13px] font-extrabold">비밀번호</p>
					<div className="flex h-[49px] items-center justify-between border rounded-[8px] px-[13px] py-[14px] bg-white border-[#E3E6EB] w-full">
							<input
								id="password"
								type="password"
								value={form.password}
								onChange={(e) => handleChangeField("password", e.target.value)}
								placeholder="8자 이상"
								className="flex-1 min-w-0  bg-transparent"
							/>
					</div>

					<p className="text-[11px] font-regular text-[#969DA8]">영문 대소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요</p>

						{showPasswordError && <p className="text-[11px] font-regular text-[#D92D20]">비밀번호를 다시 한 번 입력해 주세요.</p> }

				</div>



				<div className="flex flex-col gap-2  w-full">
					<p className="text-[13px] font-extrabold">비밀번호 확인</p>
					<div className="flex h-[49px] items-center justify-between border rounded-[8px] px-[13px] py-[14px] bg-white border-[#E3E6EB] w-full">
							<input
								id="passwordCorfirm"
								type="password"
								value={form.passwordConfirm}
								onChange={(e) => handleChangeField("passwordConfirm", e.target.value)}
								placeholder="다시 입력"
								className="flex-1 min-w-0  bg-transparent"
							/>
					</div>

					{showPasswordConfirmError && (
						<p className="text-[11px] font-regular text-[#D92D20]">비밀번호가 일치하지 않아요</p>
					)}

				</div>




				<button 
					type="submit" 
					disabled={!canSubmit}
					className={`h-12 border rounded-[8px] ${ canSubmit ? "bg-[#2563EB]" : "bg-[#9ab5f5]" } border-white p-4 text-center items-center text-white text-[14px] font-extrabold`}
				>
					가입하기
				</button>

				<div className="flex flex-row justify-center items-center gap-1">
						<p className="font-regular text-[13px] text-[#606774] ">이미 계정이 있나요?</p>
						<p className="font-extrabold text-[12px] text-[#2563EB] ">로그인</p>
				</div>


			</form>
		</div>
  )
}
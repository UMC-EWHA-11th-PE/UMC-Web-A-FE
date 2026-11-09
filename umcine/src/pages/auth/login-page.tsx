import { Link } from "@tanstack/react-router"

export function LoginPage() {

  // noValidate는 폼 제출 시 브라우저의 기본 유효성 검사를 끔
  return (
        <div className="flex flex-col items-center w-full">
            <div 
                    //onSubmit={handleSubmit} noValidate
                    className="flex flex-col mt-30 w-[480px] gap-[16px] text-left"
            >

                <h1 className="text-[34px] font-bold">로그인</h1>
            


                <div className="flex flex-col gap-2  w-full">
                    <p className="text-[13px] font-extrabold">이메일</p>
                    <div className="flex h-[49px] items-center border rounded-[8px] px-[13px] py-[14px] bg-white border-[#E3E6EB] w-full gap-2">
                            <img 
                                src="/icons/mail.svg" 
                                className="absolute opacity-50"
                            />
                            <input
                                id="email"
                                type="email"
                                //value={form.email}
                                //onChange={(e) => handleChangeField("email", e.target.value)}
                                placeholder="name@example.com"
                                className="flex-1 min-w-0 h-full pl-8"
                            />
                    </div>

                </div>



                <div className="flex flex-col gap-2  w-full">
                    <p className="text-[13px] font-extrabold">비밀번호</p>
                    <div className="flex h-[49px] items-center justify-between border rounded-[8px] px-[13px] py-[14px] bg-white border-[#E3E6EB] w-full">
                            <img 
                                className="absolute opacity-50"
                                src="icons/lock.svg" 
                            />
                            <input
                                id="password"
                                type="password"
                                //value={form.nickname}
                                //onChange={(e) => handleChangeField("nickname", e.target.value)}
                                placeholder="비밀번호"
                                className="flex-1 min-w-0 bg-transparent pl-8"
                            />
                    </div>
                </div>



                <button 
                    type="submit" 
                    //disabled={!canSubmit || isSubmitting }
                    className={`h-12 border rounded-[8px] bg-[#2563EB] border-white p-4 text-center items-center text-white text-[14px] font-extrabold`}
                >
                    로그인
                </button>

                <div className="flex flex-row justify-center items-center gap-1">
                        <p className="font-regular text-[13px] text-[#606774] ">처음이신가요?</p>
                        <Link 
                            to="/signup"
                            className="font-extrabold text-[12px] text-[#2563EB] "
                        >
                            회원가입
                        </Link>
                </div>


            </div>
        </div>
  )
}
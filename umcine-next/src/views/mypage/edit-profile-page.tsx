"use client";

import { useState } from "react"
import { useUpdateMeMutation } from "@/src/hooks/use-update-me-mutation";
import { useMeQuery } from "../../hooks/use-me-query";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";

export function EditProfilePage() {

	const [form, setForm] = useState({
		nickname: ""
	})

	const { data:me } = useMeQuery();

	const updateMeMutation = useUpdateMeMutation();
	const nickname = form.nickname.trim();
	const canSubmit = nickname.length >= 2 && nickname.length <= 12;

	const [nicknameDuplicateCheck, setNicknameDuplicateCheck] = useState({
		isChecking: false,
		isAvailable: false,
	}) 


	const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		if(!canSubmit || updateMeMutation.isPending) return;

		if(nickname)
			updateMeMutation.mutate({ nickname });
	}


	const handleNicknameCheckDuplicate = async () => {
		try {
			const response = await checkNicknameDuplicate(form.nickname.trim());
			const label = "닉네임"
			
			const isAvailable = response.available;
			setNicknameDuplicateCheck((prev) => ({
				...prev, 
				nickname: {...prev, isAvailable},
			}));

			alert(
				isAvailable
				? `사용할 수 있는 ${label}이에요.`
				: `이미 사용 중인 ${label}이에요.`
			);

		} 

		catch (error) {
			console.error("중복 확인 오류:", error);

			setNicknameDuplicateCheck((prev) => ({
				...prev,
				nickname: { ...prev, isAvailable: false },
			}));

			alert("중복 확인에 실패했어요. 콘솔을 확인해주세요.");
		}
		
		finally {
			setNicknameDuplicateCheck((prev) => ({
				...prev,
				nickname: { ...prev, isChecking: false }
			}));
		}
	};
	

	return (
		<div className="flex w-full justify-center">

			<form 
				className="flex flex-col max-w-[1280px] min-w-[50%]"
				onSubmit={handleSubmit}
			>

				<div className="flex flex-row items-center justify-between w-[1280px] my-5 mx-20">
					<div className="flex flex-col">
						<h1 className="text-[31px] font-bold">내 정보 수정</h1>
						<p className="text-[14px] font-regular text-[#606774]">닉네임과 프로필 이미지만 변경할 수 있어요.</p>
					</div>

					<button
						className="items-center border border-white rounded-[8px] p-4 h-[42px] bg-[#2563EB] text-white text-[14px] font-extrabold mr-22"
						type="submit"
						disabled={!canSubmit || updateMeMutation.isPending}
					>
						{updateMeMutation.isPending? "저장 중" : "변경사항 저장"}
					</button>
				</div>



				<div className="flex justify-between py-5 gap-[16px]">


					
					<div className="flex flex-col items-center h-[133px] w-[50%]">
						<div className="relative">
							<img 
								src="/icons/person.svg" 
								className="relative w-[82px] p-5 rounded-full bg-[#E3E6EB] object-cover"
							/>
							<button
								type="button"
								className="absolute bottom-0 right-0"
							>
								<img 
									className=" w-6 h-6"
									src="/icons/edit.svg" 
								/>
							</button>

						</div>
						<p className="text-[15px] font-bold">프로필 이미지</p>
						<p className="text-[11px] font-regular text-[#969DA8]">선택 사항 · 최대 5MB</p>
					</div>


					<div className="flex flex-col justify-center items-center gap-[17px] w-[50%]">
						<div className="flex flex-col w-full">
							<p className="text-[11px] font-regular text-[#969DA8]">닉네임</p>
							<div className="flex w-full items-center border rounded-[8px] px-[13px] py-[14px] bg-white border-[#E3E6EB] w-full gap-2">
								<input
										id="nickname"
										type="text"
										value={form.nickname}
										onChange={(e) => setForm({...form, nickname: e.target.value})}
										placeholder={me?.nickname}
										className="flex-1 min-w-0 h-full"
								/>
								<button 
									type="button"
									disabled={ !canSubmit || nicknameDuplicateCheck.isChecking }
									onClick={() => handleNicknameCheckDuplicate()}
									className="text-[12px] font-extrabold text-[#2563EB] w-[45px] h-[14px] shrink-0 "
								>
									{nicknameDuplicateCheck.isChecking ? "확인 중" : "중복 확인"}
								</button>
							</div>
						</div>

						<div className="flex flex-col w-full">
							<p className="text-[11px] font-regular text-[#969DA8]">이메일</p>
							<div className="flex w-full items-center border rounded-[8px] px-[13px] py-[14px] bg-white border-[#E3E6EB] w-full gap-2">
								<p className="flex-1 min-w-0 h-full">{me?.email}</p>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>

	)
}
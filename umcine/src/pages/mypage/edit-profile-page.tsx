

export function editProfilePage() {

	return (
		<div className="flex w-full justify-center">

			<div className="flex flex-col max-w-[1280px] min-w-[50%]">

				<div className="flex flex-row items-center justify-between w-[1280px] my-5 mx-20">
					<div className="flex flex-col">
						<h1 className="text-[31px] font-bold">내 정보 수정</h1>
						<p className="text-[14px] font-regular text-[#606774]">닉네임과 프로필 이미지만 변경할 수 있어요.</p>
					</div>

					<button
						className="items-center border border-white rounded-[8px] p-4 h-[42px] bg-[#2563EB] text-white text-[14px] font-extrabold mr-22"
					>
						변경사항 저장
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
										id="email"
										type="email"
										//value={form.email}
										//onChange={(e) => handleChangeField("email", e.target.value)}
										placeholder="gs0428"
										className="flex-1 min-w-0 h-full"
								/>
							</div>
						</div>

						<div className="flex flex-col w-full">
							<p className="text-[11px] font-regular text-[#969DA8]">이메일</p>
							<div className="flex w-full items-center border rounded-[8px] px-[13px] py-[14px] bg-white border-[#E3E6EB] w-full gap-2">
								<input
										id="email"
										type="email"
										//value={form.email}
										//onChange={(e) => handleChangeField("email", e.target.value)}
										placeholder="gwangsoo@cinemalab.kr"
										className="flex-1 min-w-0 h-full"
								/>
							</div>
						</div>
					</div>





				</div>


			</div>
		</div>

	)
}
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { FormField, InputBox } from "../../components/auth/form-field";
import {
  CHECK_BUTTON_CLASS_NAME,
  INPUT_CLASS_NAME,
} from "../../components/auth/form-field-styles";
import { useProfileStore } from "../../stores/profile-store";
import { resizeImageToDataUrl } from "../../utils/resize-image";

export function MyEditPage() {
  const profile = useProfileStore((state) => state.profile);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const navigate = useNavigate();

  // 저장된 닉네임으로 시작해서, 저장 버튼을 누르기 전까지는 화면 안에서만 바뀜
  const [nickname, setNickname] = useState(profile.nickname);
  // 중복 확인을 통과한 닉네임. 값을 바꾸면 다시 확인해야 함
  const [checkedNickname, setCheckedNickname] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  // 저장된 이미지로 시작해서, 새로 고르면 줄인 이미지로 바뀜 (예전 저장값에는 이 필드가 없을 수 있음)
  const [profileImage, setProfileImage] = useState(profile.profileImage ?? null);

  const trimmedNickname = nickname.trim();
  const isNicknameValid = trimmedNickname.length >= 2 && trimmedNickname.length <= 12;
  const isNicknameChanged = trimmedNickname !== profile.nickname;
  const showNicknameError = nickname.length > 0 && !isNicknameValid;

  // 닉네임을 그대로 두거나, 바꾼 닉네임이 중복 확인을 통과해야 저장 가능
  const canSave =
    isNicknameValid &&
    !isChecking &&
    (!isNicknameChanged || checkedNickname === trimmedNickname);

  const handleChangeNickname = (value: string) => {
    if (isChecking) return;
    setCheckedNickname(null);
    setNickname(value);
  };

  const handleCheckNickname = async () => {
    if (!isNicknameValid || !isNicknameChanged || isChecking) return;

    setIsChecking(true);
    try {
      const response = await checkNicknameDuplicate(trimmedNickname);
      setCheckedNickname(response.available ? trimmedNickname : null);
      alert(response.available ? "사용할 수 있는 닉네임이에요." : "이미 사용 중인 닉네임이에요.");
    } catch {
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // 같은 파일을 다시 골라도 onChange가 일어나도록 선택값을 비움
    event.target.value = "";
    if (!file) return;

    try {
      setProfileImage(await resizeImageToDataUrl(file));
    } catch {
      alert("이미지를 불러오지 못했어요. 다른 이미지를 골라 주세요.");
    }
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSave) return;

    // 내 정보 수정 API는 8주차에 연결. 지금은 store에 저장해 조회 화면에 반영함
    updateProfile({ ...profile, nickname: trimmedNickname, profileImage });
    navigate({ to: "/my" });
  };

  return (
    <main className="flex flex-col px-20 py-6">
      <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">
        <div className="flex items-start justify-between pb-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-[38px] leading-[44px] font-bold tracking-[-1.71px] text-fg">
              내 정보 수정
            </h1>
            <p className="text-sm leading-[17px] text-fg-secondary">
              닉네임과 프로필 이미지를 변경할 수 있어요.
            </p>
          </div>
          <button
            type="submit"
            disabled={!canSave}
            className="h-[42px] cursor-pointer rounded-lg border border-white bg-action px-4 text-sm font-extrabold text-white hover:bg-action-hover active:bg-action-pressed disabled:cursor-not-allowed disabled:bg-action-disabled"
          >
            변경사항 저장
          </button>
        </div>

        {/* Figma: 왼쪽 프로필 이미지, 오른쪽 입력칸 */}
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col items-center gap-2 pt-2">
            <label className="relative cursor-pointer">
              <span className="sr-only">프로필 이미지 변경</span>
              <span className="grid size-20 place-items-center overflow-hidden rounded-full bg-line">
                {profileImage ? (
                  <img src={profileImage} alt="" className="size-full object-cover" />
                ) : (
                  <span
                    aria-hidden="true"
                    className="size-9 bg-fg mask-[url('/icons/person.svg')] mask-contain mask-center mask-no-repeat"
                  />
                )}
              </span>
              {/* 오른쪽 아래 연필 배지 */}
              <span
                aria-hidden="true"
                className="absolute right-0 bottom-0 grid size-6 place-items-center rounded-full bg-surface"
              >
                <span className="size-6 bg-fg mask-[url('/icons/edit.svg')] mask-contain mask-center mask-no-repeat" />
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleChangeImage}
                className="sr-only"
              />
            </label>
            <p className="text-sm leading-[17px] font-bold text-fg">프로필 이미지</p>
            <p className="text-[11px] leading-[13px] text-fg-tertiary">JPG, PNG 이미지</p>
          </div>

          <div className="flex flex-col gap-5">
            <FormField
              id="edit-nickname"
              label="닉네임"
              error={showNicknameError ? "닉네임은 2~12자로 입력해 주세요." : undefined}
            >
              <InputBox hasError={showNicknameError}>
                <input
                  id="edit-nickname"
                  type="text"
                  value={nickname}
                  onChange={(event) => handleChangeNickname(event.target.value)}
                  disabled={isChecking}
                  className={INPUT_CLASS_NAME}
                />
                <button
                  type="button"
                  disabled={!isNicknameValid || !isNicknameChanged || isChecking}
                  onClick={handleCheckNickname}
                  className={CHECK_BUTTON_CLASS_NAME}
                >
                  {isChecking ? "확인 중" : "중복 확인"}
                </button>
              </InputBox>
            </FormField>

            {/* 이메일은 바꿀 수 없어서 읽기 전용으로 보여줌 */}
            <FormField id="edit-email" label="이메일">
              <InputBox hasError={false}>
                <input
                  id="edit-email"
                  type="email"
                  value={profile.email}
                  readOnly
                  className={INPUT_CLASS_NAME}
                />
              </InputBox>
            </FormField>
          </div>
        </div>

        {/* Figma: 화면 아래 빨간 테두리의 회원 탈퇴 영역 */}
        <section className="mt-auto flex items-center justify-between rounded-lg border border-danger/40 bg-danger/10 px-5 py-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm leading-[17px] font-bold text-danger">회원 탈퇴</h2>
            <p className="text-xs leading-4 text-danger">
              탈퇴하면 작성한 평점, 즐겨찾기 정보가 모두 삭제되며 복구할 수 없습니다.
            </p>
          </div>
          {/* 회원 탈퇴 API는 아직 없어서 버튼만 둠 */}
          <button
            type="button"
            className="h-[38px] shrink-0 cursor-pointer rounded-lg border border-danger bg-surface px-4 text-sm font-bold text-danger"
          >
            회원 탈퇴
          </button>
        </section>
      </form>
    </main>
  );
}

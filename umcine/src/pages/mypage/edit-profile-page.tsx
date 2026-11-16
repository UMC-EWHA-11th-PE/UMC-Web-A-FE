import { useEffect, useState } from "react";
import { checkNicknameDuplicate } from "@/api/members/check-nickname-duplicate";

type EditProfilePageProps = {
  nickname: string;
  email: string;
  profileImageUrl?: string;
  onSave?: (changes: {
    nickname: string;
    profileImage: File | null;
  }) => Promise<void>;
  onWithdraw?: () => Promise<void>;
};

export function EditProfilePage({
  nickname,
  email,
  profileImageUrl,
  onSave,
  onWithdraw,
}: EditProfilePageProps) {
  const [draftNickname, setDraftNickname] = useState(nickname);
  const [checkedNickname, setCheckedNickname] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [imageError, setImageError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    if (!profileImage) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(profileImage);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [profileImage]);

  const nextNickname = draftNickname.trim();
  const nicknameChanged = nextNickname !== nickname.trim();
  const isNicknameValid = nextNickname.length >= 2 && nextNickname.length <= 12;
  const isBusy = isSaving || isWithdrawing;
  const canCheckNickname =
    nicknameChanged && isNicknameValid && !isChecking && !isBusy;
  const canSave =
    Boolean(onSave) &&
    !isBusy &&
    !isChecking &&
    nicknameChanged &&
    isNicknameValid &&
    checkedNickname === nextNickname;

  async function handleCheckNickname() {
    if (!canCheckNickname) return;

    setIsChecking(true);
    setCheckedNickname(null);
    setNicknameMessage("");

    try {
      const response = await checkNicknameDuplicate(nextNickname);
      setCheckedNickname(response.available ? nextNickname : null);
      setNicknameMessage(
        response.available
          ? "사용할 수 있는 닉네임이에요."
          : "이미 사용 중인 닉네임이에요.",
      );
    } catch {
      setNicknameMessage("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsChecking(false);
    }
  }

  async function handleSave() {
    if (!canSave || !onSave) return;

    setIsSaving(true);
    setActionMessage("");

    try {
      await onSave({ nickname: nextNickname, profileImage });
      setProfileImage(null);
      setActionMessage("변경사항을 저장했어요.");
    } catch {
      setActionMessage("저장에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleWithdraw() {
    if (!onWithdraw || isBusy) return;
    if (
      !window.confirm("정말 탈퇴하시겠어요? 삭제된 정보는 복구할 수 없어요.")
    ) {
      return;
    }

    setIsWithdrawing(true);
    setActionMessage("");

    try {
      await onWithdraw();
    } catch {
      setActionMessage("회원 탈퇴에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsWithdrawing(false);
    }
  }

  return (
    <main className="bg-[#f4f5f7] text-[#171b21]">
      <form
        className="mx-auto flex min-h-[calc(100dvh-73px)] w-full max-w-[1280px] flex-col px-6 py-7 md:px-10"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSave();
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[31px] font-bold">내 정보 수정</h1>
            <p className="mt-1 text-sm text-[#626b78]">
              닉네임과 프로필 이미지만 변경할 수 있어요.
            </p>
          </div>
          <button
            type="submit"
            disabled={!canSave}
            className="rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "저장 중" : "변경사항 저장"}
          </button>
        </div>

        {actionMessage && (
          <p role="status" className="mt-3 text-sm">
            {actionMessage}
          </p>
        )}

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-1">
            <label className="group relative cursor-pointer rounded-full">
              <input
                type="file"
                accept="image/*"
                aria-label="프로필 이미지 변경"
                aria-describedby="profile-image-help"
                disabled={isBusy}
                className="peer sr-only"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  event.currentTarget.value = "";
                  if (!file) return;

                  if (!file.type.startsWith("image/")) {
                    setImageError("이미지 파일을 선택해 주세요.");
                    return;
                  }

                  if (file.size > 5 * 1024 * 1024) {
                    setImageError("5MB 이하 이미지를 선택해 주세요.");
                    return;
                  }

                  setImageError("");
                  setProfileImage(file);
                }}
              />
              <img
                src={previewUrl ?? profileImageUrl ?? "/icons/person.svg"}
                alt=""
                className={`h-[82px] w-[82px] rounded-full bg-[#E3E6EB] object-cover peer-focus-visible:ring-2 peer-focus-visible:ring-[#2563EB] ${
                  previewUrl || profileImageUrl ? "" : "p-5"
                }`}
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 right-0 grid h-6 w-6 place-items-center rounded-full border border-[#171b21] bg-white text-xs"
              >
                ✎
              </span>
            </label>

            <p className="text-sm font-bold">프로필 이미지</p>
            <p id="profile-image-help" className="text-xs text-[#626b78]">
              선택 사항 · 최대 5MB
            </p>
            {imageError && (
              <p role="alert" className="text-xs text-red-600">
                {imageError}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="profile-nickname"
                className="mb-2 block text-sm font-bold"
              >
                닉네임
              </label>
              <div className="relative">
                <input
                  id="profile-nickname"
                  value={draftNickname}
                  readOnly={isChecking || isBusy}
                  autoComplete="nickname"
                  aria-describedby="profile-nickname-status"
                  onChange={(event) => {
                    setDraftNickname(event.target.value);
                    setCheckedNickname(null);
                    setNicknameMessage("");
                  }}
                  className="h-12 w-full rounded-lg border border-[#E3E6EB] bg-white px-4 pr-28 text-sm"
                />
                <button
                  type="button"
                  disabled={!canCheckNickname}
                  onClick={() => void handleCheckNickname()}
                  className="absolute inset-y-0 right-4 text-xs font-bold text-[#2563EB] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isChecking ? "확인 중" : "중복 확인"}
                </button>
              </div>
              <p
                id="profile-nickname-status"
                role="status"
                className="mt-1 text-xs"
              >
                {nicknameChanged && !isNicknameValid
                  ? "닉네임은 2~12자로 입력해 주세요."
                  : nicknameMessage}
              </p>
            </div>

            <div>
              <label
                htmlFor="profile-email"
                className="mb-2 block text-sm font-bold"
              >
                이메일
              </label>
              <input
                id="profile-email"
                type="email"
                value={email}
                readOnly
                className="h-12 w-full rounded-lg border border-[#E3E6EB] bg-white px-4 text-sm"
              />
            </div>
          </div>
        </div>

        <section className="mt-auto pt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-400 bg-red-50 p-5">
            <div>
              <h2 className="text-sm font-bold text-red-700">회원 탈퇴</h2>
              <p className="mt-1 text-xs text-red-700">
                탈퇴하면 작성한 평점, 후기와 즐겨찾기가 삭제되며 복구할 수
                없습니다.
              </p>
            </div>
            <button
              type="button"
              disabled={!onWithdraw || isBusy}
              onClick={() => void handleWithdraw()}
              className="rounded-lg border border-red-500 bg-white px-4 py-2 text-sm font-bold text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isWithdrawing ? "처리 중" : "회원 탈퇴"}
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}

import { useRef, useState } from "react";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";

const INITIAL_PROFILE = {
  nickname: "gs0428",
  email: "gwangsoo@cinemalab.kr",
  image: "",
};

type FavoriteMovie = {
  id: number;
  title: string;
  releaseDate: string;
  posterUrl: string;
};

// 즐겨찾기 API 연결
const FAVORITES: FavoriteMovie[] = [];

export function MyPage() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [draft, setDraft] = useState(INITIAL_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [checkedNickname, setCheckedNickname] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nickname = draft.nickname.trim();
  const isNicknameValid = nickname.length >= 2 && nickname.length <= 12;
  const isNicknameUnchanged = nickname === profile.nickname;
  const canSave =
    isNicknameValid &&
    !isChecking &&
    (isNicknameUnchanged || checkedNickname === nickname);

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(FAVORITES.length / pageSize));
  const movies = FAVORITES.slice((page - 1) * pageSize, page * pageSize);

  const startEditing = () => {
    setDraft({ ...profile });
    setCheckedNickname(null);
    setIsEditing(true);
  };

  const checkNickname = async () => {
    if (!isNicknameValid || isChecking) return;
    setIsChecking(true);

    try {
      const response = await checkNicknameDuplicate(nickname);
      setCheckedNickname(response.available ? nickname : null);
      alert(
        response.available
          ? "사용할 수 있는 닉네임이에요."
          : "이미 사용 중인 닉네임이에요.",
      );
    } catch {
      setCheckedNickname(null);
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsChecking(false);
    }
  };

  const selectImage = (file: File | undefined) => {
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("JPG, PNG, WEBP 이미지를 선택해 주세요.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      const image = reader.result;
      setDraft((prev) => ({ ...prev, image }));
    };
    reader.readAsDataURL(file);
  };

  const buttonClass =
    "rounded-md bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50";

  const avatar = (image: string) => (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200">
      {image ? (
        <img src={image} alt="프로필" className="h-full w-full object-cover" />
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-11 w-11 text-gray-900"
          fill="currentColor"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 22v-3a8 6 0 0 1 16 0v3Z" />
        </svg>
      )}
    </div>
  );

  return (
    <main className="flex flex-1 flex-col bg-[#f5f6f8] px-5 py-7 sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
        {isEditing ? (
          <form
            className="flex min-h-[75vh] flex-1 flex-col"
            onSubmit={(event) => {
              event.preventDefault();
              if (!canSave) return;

              // 회원 정보 수정 API를 이 위치에 연결하세요.
              setProfile({ ...draft, nickname });
              setIsEditing(false);
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">내 정보 수정</h1>
                <p className="mt-2 text-xs text-gray-500">
                  닉네임과 프로필 이미지를 변경할 수 있어요.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-xs"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={!canSave}
                  className={buttonClass}
                >
                  변경사항 저장
                </button>
              </div>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="flex flex-col items-center pt-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="relative rounded-full focus-visible:outline-2 focus-visible:outline-blue-600"
                  aria-label="프로필 이미지 변경"
                >
                  {avatar(draft.image)}
                  <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border border-gray-900 bg-white text-sm">
                    ✎
                  </span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(event) => {
                    selectImage(event.target.files?.[0]);
                    event.target.value = "";
                  }}
                />
                <p className="mt-3 text-xs font-semibold">프로필 이미지</p>
                <p className="mt-1 text-[10px] text-gray-400">
                  선택 사항 · 최대 5MB
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="nickname"
                    className="mb-2 block text-xs font-semibold"
                  >
                    닉네임
                  </label>
                  <div className="relative">
                    <input
                      id="nickname"
                      value={draft.nickname}
                      disabled={isChecking}
                      onChange={(event) => {
                        setDraft((prev) => ({
                          ...prev,
                          nickname: event.target.value,
                        }));
                        setCheckedNickname(null);
                      }}
                      className="h-11 w-full rounded-md border border-gray-200 bg-white pl-3 pr-24 text-sm focus:outline-blue-600"
                    />
                    <button
                      type="button"
                      disabled={
                        !isNicknameValid || isNicknameUnchanged || isChecking
                      }
                      onClick={checkNickname}
                      className="absolute inset-y-0 right-3 text-xs font-semibold text-blue-600 disabled:opacity-40"
                    >
                      {isChecking ? "확인 중" : "중복 확인"}
                    </button>
                  </div>
                  {!isNicknameValid && (
                    <p className="mt-1 text-xs text-red-500">
                      닉네임은 2~12자로 입력해 주세요.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold"
                  >
                    이메일
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={profile.email}
                    readOnly
                    className="h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-600"
                  />
                </div>
              </div>
            </div>

            <div className="mt-auto pt-20">
              <div className="flex items-center justify-between gap-4 rounded-lg border border-red-400 bg-red-50 p-4">
                <div>
                  <h2 className="text-xs font-semibold text-red-500">
                    회원 탈퇴
                  </h2>
                  <p className="mt-1 text-[11px] text-red-500">
                    탈퇴하면 계정 정보와 즐겨찾기가 삭제되며 복구할 수 없습니다.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    alert("회원 탈퇴는 서버 API 연결 후 이용할 수 있어요.")
                  }
                  className="shrink-0 rounded-md border border-red-400 bg-white px-3 py-2 text-xs font-semibold text-red-500"
                >
                  회원 탈퇴
                </button>
              </div>
            </div>
          </form>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-gray-200 pb-6">
              <h1 className="text-2xl font-bold">내 정보</h1>
              <button onClick={startEditing} className={buttonClass}>
                정보 수정
              </button>
            </div>

            <section className="border-b border-gray-200 py-5">
              <h2 className="text-sm font-semibold">기본 정보</h2>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                {avatar(profile.image)}
                <dl className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-gray-400">닉네임</dt>
                    <dd className="mt-1 text-sm font-semibold">
                      {profile.nickname}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-400">이메일</dt>
                    <dd className="mt-1 break-all text-sm font-semibold">
                      {profile.email}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            <section className="py-6">
              <h2 className="mb-4 text-sm font-semibold">내 즐겨찾기</h2>

              {movies.length === 0 ? (
                <p className="py-16 text-center text-sm text-gray-400">
                  아직 즐겨찾기한 영화가 없어요.
                </p>
              ) : (
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {movies.map((movie) => (
                    <li key={movie.id}>
                      <a href={`/movies/${movie.id}`}>
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="aspect-[2/3] w-full rounded-lg bg-gray-200 object-cover"
                        />
                        <h3 className="mt-2 text-sm font-semibold">
                          {movie.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-400">
                          {movie.releaseDate}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              <nav
                aria-label="즐겨찾기 페이지"
                className="mt-8 flex items-center justify-center gap-4"
              >
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  aria-label="이전 페이지"
                  className="text-blue-600 disabled:opacity-20"
                >
                  ‹
                </button>
                <span
                  aria-current="page"
                  className="rounded-md bg-gray-900 px-3 py-2 text-xs text-white"
                >
                  {page}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  aria-label="다음 페이지"
                  className="text-blue-600 disabled:opacity-20"
                >
                  ›
                </button>
              </nav>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

// NEXT_PUBLIC_으로 시작하는 값만 브라우저 코드에 들어간다.
// process.env.이름 형태로 직접 써야 빌드할 때 실제 값으로 바뀐다.
const tmdbApiBaseUrl = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL;
const tmdbAccessToken = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

if (!tmdbApiBaseUrl || !tmdbAccessToken) {
  throw new Error("TMDB 환경 변수가 필요해요.");
}

export const env = {
  tmdbApiBaseUrl,
  tmdbAccessToken,
  // 회원 서버(Spring) 주소
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
};

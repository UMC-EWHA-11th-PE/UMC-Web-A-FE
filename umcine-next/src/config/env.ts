// Next는 process.env.NEXT_PUBLIC_XXX 를 "글자 그대로" 써야 브라우저 번들에 값이 들어가요.
// (process.env[name] 처럼 동적으로 쓰면 undefined가 돼요.)
const tmdbApiBaseUrl = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL;
const tmdbAccessToken = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

if (!tmdbApiBaseUrl || !tmdbAccessToken) {
  throw new Error("TMDB 환경 변수가 필요해요.");
}

export const env = {
  tmdbApiBaseUrl,
  tmdbAccessToken,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
};

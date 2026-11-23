// 클라이언트 컴포넌트에서도 쓰기 때문에 NEXT_PUBLIC_ 접두사가 필요하다.
// Next.js는 process.env.NEXT_PUBLIC_* 를 빌드할 때 값으로 치환하므로 반드시 정적으로 접근해야 한다.
const tmdbApiBaseUrl = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL
const tmdbAccessToken = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''

if (!tmdbApiBaseUrl||!tmdbAccessToken) {
    throw new Error("TMDB 환경 변수가 필요해요.")
}

export const env={
    tmdbApiBaseUrl,
    tmdbAccessToken,
    apiBaseUrl,
}

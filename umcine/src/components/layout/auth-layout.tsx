import {Navigate, Outlet} from "@tanstack/react-router";
import {useAuthStore} from "../../stores/auth-store.ts";

export function AuthLayout() {
    const isLoggedIn = useAuthStore((state) => state.accessToken !== null);

    // 페이지를 보는 중에 토큰이 만료되어 지워진 경우
    if (!isLoggedIn) {
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;
}

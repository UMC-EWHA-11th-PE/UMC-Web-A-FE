import type {ReactNode} from "react";
import {AuthLayout} from "../../components/layout/auth-layout.tsx";

interface AuthGroupLayoutProps {
    children: ReactNode;
}

// (auth) 그룹은 URL에 나타나지 않고, 안의 페이지를 로그인 사용자 전용으로 묶는다
export default function Layout({children}: AuthGroupLayoutProps) {
    return <AuthLayout>{children}</AuthLayout>;
}

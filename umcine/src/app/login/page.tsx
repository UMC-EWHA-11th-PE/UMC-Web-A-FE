import type {Metadata} from "next";
import {GuestOnly} from "../../components/layout/guest-only.tsx";
import {LoginPage} from "../../screens/auth/login-page.tsx";

export const metadata: Metadata = {
    title: "로그인 | UMCine",
};

export default function Page() {
    return (
        <GuestOnly>
            <LoginPage/>
        </GuestOnly>
    );
}

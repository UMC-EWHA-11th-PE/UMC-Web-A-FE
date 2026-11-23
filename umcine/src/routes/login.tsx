import {createFileRoute, redirect} from "@tanstack/react-router";
import {LoginPage} from "../screens/auth/login-page.tsx";
import {useAuthStore} from "../stores/auth-store.ts";

export const Route = createFileRoute("/login")({
    beforeLoad: () => {
        if (useAuthStore.getState().accessToken) {
            throw redirect({to: "/"});
        }
    },
    component: LoginPage,
});

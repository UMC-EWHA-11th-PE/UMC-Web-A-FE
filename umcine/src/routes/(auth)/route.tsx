import {createFileRoute, redirect} from "@tanstack/react-router";
import {AuthLayout} from "../../components/layout/auth-layout.tsx";
import {useAuthStore} from "../../stores/auth-store.ts";

export const Route = createFileRoute("/(auth)")({
    beforeLoad: () => {
        if (!useAuthStore.getState().accessToken) {
            throw redirect({to: "/login"});
        }
    },
    component: AuthLayout,
});

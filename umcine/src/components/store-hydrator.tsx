"use client";

import { useEffect } from "react";
import { useAuthStore } from "../stores/auth-store.ts";
import { useViewSettingsStore } from "../stores/view-settings-store.ts";

// localStorage는 브라우저에만 있으므로 마운트된 뒤(useEffect)에 persist 스토어를 복원한다
export function StoreHydrator() {
    useEffect(() => {
        void useAuthStore.persist.rehydrate();
        void useViewSettingsStore.persist.rehydrate();
    }, []);

    return null;
}

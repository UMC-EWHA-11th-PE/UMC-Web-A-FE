import {Header} from "../components/layout/header.tsx";
import {createRootRoute, Outlet} from "@tanstack/react-router";

export const Route = createRootRoute({
    component: () =>(
        <div className="flex min-h-screen flex-col">
            <Header />
            <Outlet />
        </div>
    ),
    notFoundComponent: ()=><main>페이지를 찾을 수 없어요.</main>,
});
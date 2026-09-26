import {Header} from "../components/layout/header.tsx";
import {createRootRoute, Outlet} from "@tanstack/react-router";

export const Route = createRootRoute({
    component: () =>(
        <>
            <Header />
            <Outlet />
        </>
    ),
    notFoundComponent: ()=><main>페이지를 찾을 수 없어요.</main>,
});
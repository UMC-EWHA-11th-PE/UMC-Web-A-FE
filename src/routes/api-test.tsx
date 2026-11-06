import { createFileRoute } from "@tanstack/react-router";
import { ApiTestPage } from "../pages/movies/api-test-page";

export const Route = createFileRoute("/api-test")({
    component: ApiTestPage,
});
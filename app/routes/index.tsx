import { getCookie } from "vinxi/http";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

export const checkUser = createServerFn({ method: "GET" })
    .handler(() => {
        const user = getCookie("user");
        return { hasUser: user !== undefined }
    });

export const Route = createFileRoute("/")({
    ssr: true,
    component: Home,
    beforeLoad: async () => {
        const result = await checkUser();
        if (!result.hasUser) throw redirect({ to: "/login" });
    },
})

function Home() {
    return (
        <h1>Starter</h1>
    );
}

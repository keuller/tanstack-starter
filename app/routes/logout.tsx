import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start';
import { setCookie } from 'vinxi/http';

const logoutAction = createServerFn({ method: "GET" })
    .handler(() => {
        setCookie("user", "", { httpOnly: true, maxAge: -1 });
        throw redirect({ to: "/login", reloadDocument: true });
    });

export const Route = createFileRoute('/logout')({
    ssr: true,
    component: Logout,
    beforeLoad: async () => {
        await logoutAction();
    }
});

function Logout() {
    return null;
}

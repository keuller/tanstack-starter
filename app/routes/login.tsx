import { setCookie, setResponseStatus } from "vinxi/http";
import { createServerFn, useServerFn } from "@tanstack/start";
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useMutation } from "~/utils/useMutation";
import { AlertWarning } from "~/components/Alerts";

type TLoginForm = { email: string; password: string; }

const loginAction = createServerFn({ method: "POST" })
    .validator((data: unknown) => data as TLoginForm)
    .handler(async ({ data }) => {
        const validCredentials = data.email === "admin@test.com" && data.password === "abc123";

        await new Promise((r) => setTimeout(r, 1500));

        if (validCredentials) {
            setCookie("user", "user-test", { maxAge: 300, httpOnly: true, path: "/", secure: true });
            throw redirect({ to: "/", reloadDocument: true });
        }

        setResponseStatus(400, "Invalid credentials");
        return { message: "Invalid credentials, try again." }
    });

export const Route = createFileRoute('/login')({
    ssr: true,
    component: Login,
});

function Login() {
    const { error, mutate: doLogin, status } = useMutation({ fn: useServerFn(loginAction) });
    const isPending = status === "pending";

    return (
        <div className="flex flex-col items-center gap-3 justify-center h-full">
            {status === "error" && (
                <div className="w-96">
                    <AlertWarning title="Starter!" message={error?.message ?? ""} />
                </div>
            )}

            <form id="loginForm" method="post" onSubmit={async (ev) => {
                ev.preventDefault();
                const data = Object.fromEntries(new FormData(ev.target as HTMLFormElement));
                await doLogin({ data });
            }}
                className="flex flex-col gap-3 border rounded-md p-4 min-w-96 shadow">

                <h3 className="text-xl font-bold leading-6">Welcome!</h3>

                <div className="space-y-1">
                    <label htmlFor="email" className="block w-fit pl-0.5 text-sm"> E-mail </label>
                    <input id="email" type="email" name="email" maxLength={120} required
                        className="w-full rounded-xl border border-slate-300 bg-slate-100 px-2 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:border-slate-700 dark:bg-slate-800/50 dark:focus-visible:outline-blue-600"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="password" className="block w-fit pl-0.5 text-sm">Password</label>
                    <input id="password" type="password" name="password" maxLength={40} required
                        className="w-full rounded-xl border border-slate-300 bg-slate-100 px-2 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:border-slate-700 dark:bg-slate-800/50 dark:focus-visible:outline-blue-600"
                    />
                </div>

                <div className="flex gap-2">
                    <button type="submit" disabled={isPending}
                        className="cursor-pointer whitespace-nowrap rounded-xl bg-blue-700 px-4 py-2 text-sm font-medium tracking-wide text-slate-100 transition hover:opacity-75 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 active:opacity-100 active:outline-offset-0 disabled:opacity-75 disabled:cursor-not-allowed dark:bg-blue-600 dark:text-slate-100 dark:focus-visible:outline-blue-600">
                        {isPending ? "..." : "Access"}
                    </button>
                </div>
            </form>
        </div>
    );
}

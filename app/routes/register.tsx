import { useMutation } from "~/utils/useMutation";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/start";
import { registerActionHandler, type TRegisterForm } from "~/lib/handlers/register";

export const registerAction = createServerFn({ method: "POST" })
    .validator((data: unknown) => data as TRegisterForm)
    .handler(registerActionHandler);

export const Route = createFileRoute('/register')({
    ssr: true,
    component: Register,
});

function Register() {
    const { mutate: register, status } = useMutation({
        fn: useServerFn(registerAction),
    });

    const formSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const data = Object.fromEntries(new FormData(ev.target as HTMLFormElement));
        await register({ data });
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <form id="registerForm" method="post" onSubmit={formSubmit}
                className="flex flex-col gap-3 border rounded-md p-4 min-w-96 shadow">

                <h3 className="text-xl font-bold leading-6">Create your account!</h3>

                <div className="space-y-1">
                    <label htmlFor="username" className="block w-fit pl-0.5 text-sm"> Name </label>
                    <input id="username" type="text" name="username" maxLength={40} required
                        className="w-full rounded-xl border border-slate-300 bg-slate-100 px-2 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:border-slate-700 dark:bg-slate-800/50 dark:focus-visible:outline-blue-600"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="email" className="block w-fit pl-0.5 text-sm"> E-mail </label>
                    <input id="email" type="email" name="email" maxLength={120} required
                        className="w-full rounded-xl border border-slate-300 bg-slate-100 px-2 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:border-slate-700 dark:bg-slate-800/50 dark:focus-visible:outline-blue-600"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="password" className="block w-fit pl-0.5 text-sm"> Password </label>
                    <input id="password" type="password" name="password" maxLength={40} required
                        className="w-full rounded-xl border border-slate-300 bg-slate-100 px-2 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:border-slate-700 dark:bg-slate-800/50 dark:focus-visible:outline-blue-600"
                    />
                </div>

                <div className="flex gap-2">
                    <button type="submit" disabled={status === "pending"}
                        className="cursor-pointer whitespace-nowrap rounded-xl bg-blue-700 px-4 py-2 text-sm font-medium tracking-wide text-slate-100 transition hover:opacity-75 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 active:opacity-100 active:outline-offset-0 disabled:opacity-75 disabled:cursor-not-allowed dark:bg-blue-600 dark:text-slate-100 dark:focus-visible:outline-blue-600">
                        {status === "pending" ? "..." : "Register"}
                    </button>
                </div>
            </form>
        </div>
    );
}

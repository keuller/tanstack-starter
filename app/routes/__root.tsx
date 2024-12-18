import appCss from "~/app.css?url";
import type { ReactNode } from "react";
import { Meta, Scripts } from "@tanstack/start";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Outlet, ScrollRestoration, createRootRoute, type ErrorComponentProps } from "@tanstack/react-router";
import AppHeader from "~/components/AppHeader";

function Root({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="pt">
            <head>
                <Meta />
            </head>
            <body className="antialised flex flex-col bg-gray-100 h-dvh">
                <AppHeader />
                <main id="app-content" className="flex-1">
                    {children}
                </main>
                <ScrollRestoration />
                <TanStackRouterDevtools position="bottom-right" />
                <Scripts />
            </body>
        </html>
    )
}

function DefaultErrorBoundary({ error }: { error: Error }) {
    return (
        <div className="p-3 rounded-md border-red-500 bg-red-100 text-red-500 space-y-3">
            <h2 className="text-lg">Ooops! Something went wrong!</h2>
            <p className="text-sm">{error.message}</p>
        </div>
    );
}

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'TanStack Starter',
            },
        ],
        links: [
            { rel: 'stylesheet', href: appCss }
        ]
    }),
    component: () => (
        <Root>
            <Outlet />
        </Root>
    ),
    errorComponent: ({ error }: ErrorComponentProps) => (
        <Root>
            <DefaultErrorBoundary error={error} />
        </Root>
    )
});
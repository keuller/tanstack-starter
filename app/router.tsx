import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
    const router = createTanStackRouter({
        routeTree,
        defaultPreload: "intent",
        defaultNotFoundComponent: () => (
            <div>Page Not Found! :(</div>
        ),
    });

    return router;
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof createRouter>
    }
}
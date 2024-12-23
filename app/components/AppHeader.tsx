import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";
import { checkUser } from "~/routes";

export default function AppHeader() {
    const [isUser, setUser] = useState<boolean>(false);
    const doCheckUser = useServerFn(checkUser);

    useEffect(() => {
        doCheckUser().then((user) => setUser(user.hasUser));
    }, []);

    return (
        <header className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-xl font-medium">Starter</h2>
            {!isUser && (
                <nav className="flex gap-1 items-center">
                    <Link to="/login" className="text-sm">Login</Link>
                    <span>&nbsp;|&nbsp;</span>
                    <Link to="/register" className="text-sm">Register</Link>
                </nav>
            )}

            {isUser && (<nav className="flex gap-1 items-center">
                <a href="/logout" className="text-sm">Logout</a>
            </nav>)}
        </header>
    );
}
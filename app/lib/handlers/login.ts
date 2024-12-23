import { redirect } from "@tanstack/react-router";
import { setCookie, setResponseStatus } from "vinxi/http";
import { conn } from "~/lib/database";
import { fetchUserByEmail } from "~/lib/store/user.store";
import { hashPassword } from "~/utils";

export type TLoginForm = { email: string; password: string; }

export const loginActionHandler = async ({ data }: { data: TLoginForm }) => {
    try {
        const user = await fetchUserByEmail(conn(), data.email);
        const hashedPassword = await hashPassword(data.password);
        if (user.password !== hashedPassword) {
            setResponseStatus(400, "Invalid credentials");
            return { message: "Invalid credentials, try again." }
        }
    } catch (err) {
        setResponseStatus(500, "Unknown error");
        return { message: "Sorry but an unknown error occurred, try again later." }
    }

    setCookie("user", "user-test", { maxAge: 300, httpOnly: true, path: "/", secure: true });
    throw redirect({ to: "/", reloadDocument: true });
}

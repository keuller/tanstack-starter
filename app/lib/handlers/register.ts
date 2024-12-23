import { conn } from "~/lib/database";
import { newId, hashPassword } from "~/utils";
import { redirect } from "@tanstack/react-router";
import { createUser } from "~/lib/store/user.store";
import type { InsertUser } from "~/lib/store/schema";

export type TRegisterForm = { username: string; email: string; password: string };

export const registerActionHandler = async ({ data }: { data: TRegisterForm }) => {
    const { email, password, username } = data;
    const newUser: InsertUser = {
        id: newId(),
        username,
        email,
        password: await hashPassword(password),
        active: true
    };

    await createUser(conn(), newUser);

    throw redirect({ to: "/login", statusCode: 302 });
};

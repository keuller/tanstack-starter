import crypto from "node:crypto";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("ABCDEFGHIJKLMNQWTYXZP123456789", 10);

export function newId(): string {
    return nanoid();
}

export function hashPassword(password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        crypto.pbkdf2(password, 'salt', 100000, 64, 'sha256', (err, derivedKey) => {
            if (err) {
                return reject(err);
            }
            resolve(derivedKey.toString('hex'));
        });
    });
}

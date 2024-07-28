// --- packages import
import { v4 as uuidv4 } from "uuid";
// --- locals import
import { UserModel } from "../api/modules/index.js";
// ---

export const users: UserModel[] = [
    {
        id: uuidv4(),
        username: "admin",
        email: "admin@mail.com",
        password: "admin",
        refresh_token: null,
    } satisfies UserModel,
    {
        id: uuidv4(),
        username: "mark",
        email: "mark@mail.com",
        password: "mark",
        refresh_token: null,
    } satisfies UserModel,
    {
        id: uuidv4(),
        username: "john",
        email: "john@mail.com",
        password: "john",
        refresh_token: null,
    } satisfies UserModel,
];
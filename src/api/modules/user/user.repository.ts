import { UserCreate, UserId, UserModel, UserUpdate } from "./user.model.js";
import { v4 as uuidv4 } from "uuid";

export interface UserRepository {
    getUsers(): Promise<Array<UserModel>>;
    getUser(id: string): Promise<UserModel>;
    createUser(user: UserCreate): Promise<UserModel>;
    updateUser(id: string, user: UserUpdate): Promise<UserModel>;
    deleteUser(id: string): Promise<boolean>;
}

export class UserRepositoryImpl implements UserRepository {
    async getUsers(): Promise<Array<UserModel>> {
        return [] satisfies Array<UserModel>;
    }

    async getUser(id: string): Promise<UserModel> {
        throw new Error("Method not implemented.");
    }

    async createUser(user: UserCreate): Promise<UserModel> {
        // throw new Error("Method not implemented.");
        const data = {
            id: uuidv4() as UserId,
            username: user.username,
            email: user.email,
            password: user.password,
            refresh_token: null,
        } satisfies UserModel;

        return data;
    }

    async updateUser(id: string, user: UserUpdate): Promise<UserModel> {
        throw new Error("Method not implemented.");
    }

    async deleteUser(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
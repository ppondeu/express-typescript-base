// --- packages imports
import { v4 as uuidv4 } from "uuid";
// --- locals imports
import { UserCreate, UserModel, UserUpdate } from "./user.model.js";
// ---

export interface UserRepository {
    find(): Promise<Array<UserModel>>;
    findOne(options: { id?: string; email?: string; username?: string }): Promise<UserModel | null>;
    save(user: UserCreate): Promise<UserModel>;
    update(id: string, user: UserUpdate): Promise<UserModel | null>;
    delete(id: string): Promise<boolean>;
}

export class UserRepositoryDB implements UserRepository {
    constructor(private db: any) { }
    async find(): Promise<Array<UserModel>> {
        throw new Error("Method not implemented.");
    }

    async findOne(options: { id?: string; email?: string; username?: string }): Promise<UserModel | null> {
        throw new Error("Method not implemented.");
    }

    async save(user: UserCreate): Promise<UserModel> {
        throw new Error("Method not implemented.");
    }

    async update(id: string, user: UserUpdate): Promise<UserModel> {
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

export class UserRepositoryMock implements UserRepository {
    constructor(private db: Array<UserModel>) { }
    async find(): Promise<UserModel[]> {
        return this.db;
    }

    async findOne(options: { id?: string; email?: string; username?: string }): Promise<UserModel | null> {
        return this.db.find(user =>
            (options.id && user.id === options.id) ||
            (options.email && user.email === options.email) ||
            (options.username && user.username === options.username)
        ) || null;
    }

    async save(user: UserCreate): Promise<UserModel> {
        const data = {
            id: uuidv4(),
            username: user.username,
            email: user.email,
            password: user.password,
            refresh_token: null,
        } satisfies UserModel;
        this.db.push(data);
        return data;
    }

    async update(id: string, user: UserUpdate): Promise<UserModel | null> {
        const index = this.db.findIndex((u) => u.id === id);
        if (index === -1) return null;
        this.db[index] = { ...this.db[index], ...user };
        return this.db[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = this.db.findIndex((u) => u.id === id);
        if (index === -1) return false;
        this.db.splice(index, 1);
        return true;
    }
}
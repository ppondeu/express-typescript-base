// --- packages imports
import { v4 as uuidv4 } from "uuid";
// --- locals imports
import { BadRequestException, NotFoundException } from "../../../core/errors.js";
import { UserCreate, UserModel, UserUpdate } from "./user.model.js";
// ---

export interface UserRepository {
    find(): Promise<Array<UserModel>>;
    findOne(id: string): Promise<UserModel>;
    save(user: UserCreate): Promise<UserModel>;
    update(id: string, user: UserUpdate): Promise<UserModel>;
    delete(id: string): Promise<boolean>;
}

export class UserRepositoryDB implements UserRepository {
    constructor(private db: any) { }
    async find(): Promise<Array<UserModel>> {
        throw new Error("Method not implemented.");
    }

    async findOne(id: string): Promise<UserModel> {
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
    async find(): Promise<Array<UserModel>> {
        return this.db;
    }

    async findOne(id: string): Promise<UserModel> {
        const user = this.db.find((user) => user.id === id);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async save(user: UserCreate): Promise<UserModel> {
        const data = {
            id: uuidv4(),
            username: user.username,
            email: user.email,
            password: user.password,
            refresh_token: null,
        } satisfies UserModel;
        const index = this.db.findIndex((user) => user.email === data.email || user.username === data.username);
        if (index !== -1) {
            throw new BadRequestException("Email or username already exists");
        }
        this.db.push(data);
        return data;
    }

    async update(id: string, user: UserUpdate): Promise<UserModel> {
        const index = this.db.findIndex((user) => user.id === id);
        if (index === -1) {
            throw new NotFoundException("User not found");
        }

        const updatedUser = {
            ...this.db[index],
            ...user,
        } satisfies UserModel;
        this.db[index] = updatedUser;

        return updatedUser;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.db.findIndex((user) => user.id === id);
        if (index === -1) {
            throw new NotFoundException("User not found");
        }
        this.db.splice(index, 1);
        return true;
    }
}
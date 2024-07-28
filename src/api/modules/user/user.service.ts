import { BadRequestException, NotFoundException } from "../../../core/errors.js";
import { UserCreate, UserResponse, UserUpdate } from "./user.model.js";
import { UserRepository } from "./user.repository.js";

export interface UserService {
    getUsers(): Promise<UserResponse[]>;
    getUser(id: string): Promise<UserResponse>;
    createUser(user: UserCreate): Promise<UserResponse>;
    updateUser(id: string, user: UserUpdate): Promise<UserResponse>;
    deleteUser(id: string): Promise<boolean>;
}

export class UserServiceImpl implements UserService {
    constructor(private userRepo: UserRepository) { }

    async getUsers(): Promise<UserResponse[]> {
        const users = await this.userRepo.find();
        console.log(`[INFO] Users found: `, users);
        const usersResponse = users.map((user) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
            };
        });
        return usersResponse
    }

    async getUser(id: string): Promise<UserResponse> {
        const user = await this.userRepo.findOne({ id });
        if (!user) throw new NotFoundException("User not found");
        console.log(`[INFO] User found: `, user);
        const userResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        return userResponse;
    }

    async createUser(createUserDTO: UserCreate): Promise<UserResponse> {
        const userByEmail = await this.userRepo.findOne({ email: createUserDTO.email });
        if (userByEmail) throw new BadRequestException("email already exists");

        const userByUsername = await this.userRepo.findOne({ username: createUserDTO.username });
        if (userByUsername) throw new BadRequestException("username already exists");

        const createdUser = await this.userRepo.save(createUserDTO);
        console.log(`[INFO] User created: `, createdUser);
        const userResponse = {
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email,
        };
        return userResponse;
    }

    async updateUser(id: string, updateUserDTO: UserUpdate): Promise<UserResponse> {
        const userExists = await this.userRepo.findOne({ id });
        if (!userExists) throw new NotFoundException("User not found");

        if (updateUserDTO.username) {
            const userByEmail = await this.userRepo.findOne({ username: updateUserDTO.username });
            if (userByEmail) throw new BadRequestException("email already exists");
        }

        const updatedUser = await this.userRepo.update(id, updateUserDTO);
        if (!updatedUser) throw new NotFoundException("User not found");
        console.log(`[INFO] User updated: `, updatedUser);
        const userResponse = {
            id: updatedUser.id,
            username: updatedUser.username,
            email: updatedUser.email,
        };

        return userResponse;
    }

    async deleteUser(id: string): Promise<boolean> {
        const userExists = await this.userRepo.findOne({ id });
        if (!userExists) throw new NotFoundException("User not found");

        const deleted = await this.userRepo.delete(id);
        if (!deleted) throw new NotFoundException("User not found");
        console.log(`[INFO] User deleted: `, deleted);
        return true;
    }
}
import { z } from "zod";
import { Brand } from "effect";

// user id type for string and uuid
export type UserId = string & Brand.Brand<"UserId">;
const createUserId = (value: string): UserId => {
    const uuidSchema = z.string().uuid();
    uuidSchema.parse(value);
    return value as UserId;
};

// Define the base schema
export const UserSchema = z.object({
    id: z.string().uuid().transform(createUserId),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    refresh_token: z.string().nullable(),
});

// Define the base model type
export type UserModel = z.infer<typeof UserSchema>;

// Use Pick and Partial to define other schemas
export const UserCreateSchema = UserSchema.pick({
    username: true,
    email: true,
    password: true,
});

export type UserCreate = z.infer<typeof UserCreateSchema>;

export const UserUpdateSchema = UserSchema.pick({
    username: true,
    password: true,
    refresh_token: true,
}).partial();

export type UserUpdate = z.infer<typeof UserUpdateSchema>;

export const UserLoginSchema = UserSchema.pick({
    email: true,
    password: true,
});

export type UserLogin = z.infer<typeof UserLoginSchema>;

export const UserResponseSchema = UserSchema.omit({
    password: true,
    refresh_token: true,
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

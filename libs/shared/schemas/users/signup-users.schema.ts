import * as z from 'zod';

export const SignupUserSchema = z.object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

export type SignupUserDto = z.infer<typeof SignupUserSchema>;

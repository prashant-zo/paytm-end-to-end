import { registerUser, loginUser } from '../services/auth.service.js';
import { z } from 'zod';

const signupSchema = z.object({
    firstName: z.string().min(1, {message: "First name is required"}),
    lastName: z.string().min(1, {message: "Last name is required"}),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters"})
})

const signinSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters"})
})

export const signup = async (req, res, next) => {
    try {
        const validateData = signupSchema.parse(req.body);
        const user = await registerUser(validateData);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        next(error);
    }
};
  
  export const signin = async (req, res, next) => {
    try {
        const validateData = signinchema.parse(req.body);
        const user = await loginUser(validateData);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        next(error);
    }
};
import User from '../models/User.js';
import Account from '../models/Account.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async ({ firstName, lastName, email, password }) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User already exists");
    }
    const user = await User.create({ firstName, lastName, email, password });

    const randomBalanace = Math.floor(Math.random() * 10000) + 1;
    await Account.create({ userId: user._id, balance: randomBalanace});

    return  {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id)
    };
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id)
        };
    } else {
        throw new Error("Invalid password or email");
    }
};
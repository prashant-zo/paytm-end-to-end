import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    const salt = await bcrypt.salt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (enteredPassword, hashPassword) => {
    return await bcrypt.compare(enteredPassword, hashPassword);
};
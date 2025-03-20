import User from '../models/User.js';
import Account from '../models/Account.js';
import mongoose from 'mongoose';


export const updateUserInfo = async (userId, updateData) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("user not found!");
    }
    user.firstName = updateData.firstName || user.firstName;
    user.lastName = updateData.lastName || user.lastName;
    if (user.password) {
        user.password = updateData.password;
    }
    const updateUser = await user.save();
    return {
        _id: updateUser._id,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        email: updateUser.email,
    };
};

export const getUsersService = async (filter) => {
    let query = {};
    if (filter) {
        query = {
            $or: [
                {firstName: {$regex: filter, $options: 'i'}},
                {lastName: {$regex: filter, $options: 'i'}}
            ]
        }
    };

    const user = await User.find(query).select('-password');
    return user;
}

export const getBalanceService = async (userId) => {
    const account = await Account.findOne({ userId });
    if (!account) {
        throw new Error("Account not found");
    }
    return account.balance;
} 

export const transferMoneyService = async (senderId, receiverId, amount) => {
    const receiver = await User.findById(receiverId);
    if (!receiver) {
        throw new Error("Receiver not found");
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const senderAccount = await Account.findOne({ userId: senderId }).session(session);
        if (!senderAccount) throw new Error("Sender account not found");
        if (senderAccount.balance < amount) {
            throw new Error("Insufficient funds");
        }

        const receiverAccount = await Account.findOne({ userId: receiverId }).session(session);
        if (!receiverAccount) throw new Error("Receiver account not found");

        senderAccount.balance -= amount;
        receiverAccount.balance += amount;

        await senderAccount.save({ session });
        await receiverAccount.save({ session });

        await session.commitTransaction();
        session.endSession();

        return {
            senderBalance: senderAccount.balance,
            receiverBalance: receiverAccount.balance,
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
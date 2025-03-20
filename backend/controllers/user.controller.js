import { updateUserInfo, getUsersService, getBalanceService, transferMoneyService } from "../services/user.service.js";

export const updateUser = async (req, res, next) => {
    try {
        const updateUser = await updateUserInfo(req.user.id, req.body);
        res.status(200).json(updateUser);
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const { filter } = req.query;
        const Users = await getUsersService(filter);
        res.status(200).json(Users);
    } catch (error) {
        next(error)
    }
};

export const getBalance = async (req, res, next) => {
    try {
        const balance = await getBalanceService(req.user._id);
        res.status(200).json({ balance });
    } catch (error) {
        next(error);
    }
};

export const transferMoney = async (req, res, next) => {
    try {
        const { to, amount } = req.body;
        const result = await transferMoneyService(req.user._id, to, amount);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
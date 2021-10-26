// const usuario = require("../models/usuario");
const User = require("../models/usuario");
const Message = require("../models/mensaje");

const userConnected = async (uid) => {
    const user = await User.findById(uid);
    user.online = true;
    await user.save();

    return user;
};

const userDisconnect = async (uid) => {
    const user = await User.findById(uid);
    user.online = false;
    await user.save();

    return user;
};

const getUsers = async () => {
    const users = await User.find().sort("-online");
    return users;
};

const recordMessage = async (payload) => {
    try {
        const message = new Message(payload);
        await message.save();

        return message;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    userConnected,
    userDisconnect,
    getUsers,
    recordMessage,
};

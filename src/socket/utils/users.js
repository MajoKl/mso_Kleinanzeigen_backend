const jwt = require("jsonwebtoken");
const User = require('../../models/User');
let users = []

module.exports.verify_user = async (token) => {

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        let user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        }).select("_id name").exec();

        if (!user) return { error: "You are unautherized!" };
        return user;
    } catch (error) {
        return { error: "You are unautherized!" };
    }



}


module.exports.addUser = (id, name, room = 0, user_id) => {
    const user = { id, name, room, user_id }

    users.push(user)

    return user
}

module.exports.removeUser = (id) => {

    const leaving_user = users.find((user) => user.id === id)

    users = users.filter((user) => user.id !== id)

    return leaving_user
}

module.exports.getUser = (id) => users.find((user) => user.id === id)

module.exports.getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports.getUsers = (id) => users.find((user) => user.id === id)

module.exports.getUsersCount = () => users.length

module.exports.getUsersCountInRoom = (room) => users.filter((user) => user.room === room).length

module.exports.getRooms = () => { }
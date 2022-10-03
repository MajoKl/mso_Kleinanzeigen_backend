const jwt = require("jsonwebtoken");
const User = require('../../models/User');
let users = []

module.exports.verify_user = async (token) => {


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
    }).select("_id name");

    if (!user) return { error: "You are unautherized!" };

    return user;

}


module.exports.addUser = ({ id, username, room = 0 }) => {
    console.debug(`Adding user ${username} to room ${room}`);
    const user = { id, username, room }
    users.push(user)

    return { user }


}

module.exports.removeUser = (id) => {

    const leaving_user = users.find((user) => user.id === id)

    users = users.filter((user) => user.id !== id)

    return leaving_user
}

module.exports.getUser = (id) => users.find((user) => user.id === id)

module.exports.getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports.getUsers = () => users

module.exports.getUsersCount = () => users.length

module.exports.getUsersCountInRoom = (room) => users.filter((user) => user.room === room).length

module.exports.getRooms = () => { }
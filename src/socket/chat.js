const utils = require('./utils/users');
const { generateMessage } = require('./utils/messages');
const { getUser, getUsersInRoom, } = require('./utils/users');



const socket = (socket, io) => {
  socket.on('join', async (options) => {
    console.log('join', options);

    const verify_user = await utils.verify_user(options);

    if (verify_user.error)
      return callback(verify_user.error);



    const user = utils.addUser(socket.id, verify_user.name, options.room, verify_user._id);

    socket.join(user.room)
    socket.emit('message', generateMessage('Admin', String(`Welcome!${user.name}`)));
    socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.name} has joined!`))
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })


  })

  socket.on('sendMessage', (message) => {
    const user = getUser(socket.id)
    console.log(user)
    io.to(user.room).emit('message', generateMessage(user.name, message))

  })


  socket.on('disconnect', () => {

    const leaving_user = utils.removeUser(socket.id)

    io.to(leaving_user.room).emit('message', generateMessage('Admin', `${leaving_user.name} has left!`))

  })
}

module.exports.socket = socket
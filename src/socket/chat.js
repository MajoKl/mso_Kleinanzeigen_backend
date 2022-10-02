const utils = require('./utils/users');
const { generateMessage } = require('./utils/messages');
const { getUser, getUsersInRoom, } = require('./utils/users');



const socket = (socket, io) => {
  socket.on('join', (options, callback) => {
    console.log('join', options);

    const verify_user = utils.verify_user(options.token);
    console.log(verify_user);
    if (verify_user.error) {
      console.table(verify_user.error);
      return callback(verify_user.error);
    }

    const { error, user } = utils.addUser({ id: socket.id, username: verify_user.username, room: options.room });

    socket.join(user.room)

    socket.emit('message', generateMessage('Admin', 'Welcome!'))
    socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)


    io.to(user.room).emit('message', generateMessage(user.username, message))
    callback()
  })


  socket.on('disconnect', () => {

    const leaving_user = utils.removeUser(socket.id)

    io.to(leaving_user.room).emit('message', generateMessage('Admin', `${leaving_user.username} has left!`))

  })
}

module.exports.socket = socket
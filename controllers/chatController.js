const Messages  = require('../models/messages');

const users = [];

module.exports = {
    handleConnection: (socket) => {
      console.log('A user connected');

      socket.on('register', (userId) => {
        console.log('User registered', userId);
        users[userId] = socket.id;
        console.log(`User ${userId} registered with socket id ${socket.id}`);
      });   
  
      socket.on('disconnect', () => {
        console.log('User disconnected');
        for (let i = 0; i < users.length; i++) {
          if (users[i] === socket.id) {
            delete users[i];
            break;
          }
        }
      });
  
      socket.on('message', async (data) => {
        console.log('Message received');
        const { id_emisor, id_receptor, tipo_emisor, tipo_receptor, fecha, message, tipo_mensaje } = data;
        console.log('Tipo Mensaje:', tipo_mensaje);
        // const recipientSocketId = users[id_receptor];
        // if(recipientSocketId) {
        //   socket.to(recipientSocketId).emit('message', message);
        //   console.log(`Mensaje enviado a ${id_receptor}: ${message}`);
        // } else {
        //   console.log(`User ${id_receptor} not connected`);
        // }
      
        // En cualquier caso, guardamos el mensaje en la base de datos
        console.log("Comprobando si existe el chat");
        const exists = await Messages.findOne({
          where: {
            id_emisor: id_emisor,
            id_receptor: id_receptor,
            tipo_emisor: tipo_emisor,
            tipo_receptor: tipo_receptor,
          }
        }).then((result) => {
          return result;
        }).catch((err) => {
          console.log('Error al buscar el chat', err);
        });

        console.log("Chat encontrado:", exists);
      
        // Si no existe, creamos un nuevo chat
        let id_chat = 0;
        if (exists) {
          id_chat = exists.id_chat;
        } else {
          id_chat = await Messages.max('id_chat') + 1;
          console.log('Nuevo chat:', id_chat);
        }
      
        Messages.create({
          id_emisor: id_emisor,
          id_receptor: id_receptor,
          id_chat: id_chat,
          tipo_emisor: tipo_emisor,
          tipo_receptor: tipo_receptor,
          tipo_mensaje: tipo_mensaje,
          estado: 'enviado',
          fecha: fecha,
          mensaje: message
        }).then(() => {
          console.log('Mensaje guardado en la base de datos');
          socket.emit('correcto', 'Mensaje enviado correctamente');
        }).catch((err) => {
          socket.emit('error', 'Error al enviar mensaje', err);
        });
      });      
    }
  };
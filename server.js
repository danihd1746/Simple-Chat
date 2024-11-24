const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Usuário conectado.');

    socket.on('chatMessage', (data) => {
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado.');
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const socket = io();

let usernameLocked = false; // Variável para controlar se o nome já foi definido

document.getElementById('send-button').addEventListener('click', () => {
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');

    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (!username) {
        alert('Digite um nome antes de começar a conversar!');
        return;
    }

    if (!message) {
        alert('Digite uma mensagem!');
        return;
    }

    // Bloquear o nome depois que o usuário envia a primeira mensagem
    if (!usernameLocked) {
        usernameInput.setAttribute('disabled', 'true');
        usernameLocked = true;
    }

    // Enviar a mensagem para o servidor
    socket.emit('chatMessage', { username, message });

    // Limpar o campo da mensagem
    messageInput.value = '';
});

socket.on('message', (data) => {
    const chatBox = document.getElementById('chat-box');
    const newMessage = document.createElement('div');
    newMessage.textContent = `${data.username}: ${data.message}`;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
});

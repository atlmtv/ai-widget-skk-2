const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const loadingMessage = document.getElementById('loading-message');

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(userMessage) {
    // Показываем сообщение о загрузке
    loadingMessage.style.display = 'block';

    try {
        const response = await fetch('https://your-server-url.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userMessage })
        });

        const data = await response.json();

        // Скрываем сообщение о загрузке
        loadingMessage.style.display = 'none';

        if (data && data.botResponse) {
            displayMessage(data.botResponse, 'bot');
        } else {
            displayMessage("Произошла ошибка при получении ответа.", 'bot');
        }

    } catch (error) {
        loadingMessage.style.display = 'none';
        displayMessage("Произошла ошибка с сервером.", 'bot');
    }
}

function handleUserInput() {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        displayMessage(userMessage, 'user');
        userInput.value = '';
        getBotResponse(userMessage);
    }
}

sendButton.addEventListener('click', handleUserInput);

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

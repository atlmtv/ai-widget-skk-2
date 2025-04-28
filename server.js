const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const OPENAI_API_KEY = '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';  // Замените на свой ключ OpenAI API

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.userMessage;

    try {
        const openaiResponse = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003', // Можно использовать другие модели, например, gpt-3.5-turbo
            prompt: userMessage,
            max_tokens: 150,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const botResponse = openaiResponse.data.choices[0].text.trim();
        res.json({ botResponse });
    } catch (error) {
        console.error('Ошибка при запросе к OpenAI:', error);
        res.status(500).json({ error: 'Произошла ошибка при получении ответа от OpenAI' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

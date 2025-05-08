// server.js
const express = require('expre  ss');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = '';

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'Oops! Riley tripped on a wire 💥' });
  }
});

app.listen(3000, () => console.log('Chatbot backend is thriving on port 3000'));


document.getElementById("chat-input").addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    const input = e.target.value;
    const log = document.getElementById("chat-log");
    log.innerHTML += '<div><strong>You:</strong> ${input}</div>'

    fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    })
    .then(res => res.json())
    .then(data => {
      log.innerHTML += `<div><strong>Riley:</strong> ${data.reply}</div>`;
      log.scrollTop = log.scrollHeight;
    })
    .catch(err => {
      log.innerHTML += `<div><strong>Riley:</strong> I broke 😭</div>`;
    });

    e.target.value = "";
  }
});

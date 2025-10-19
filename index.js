require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const OpenAI = require('openai')

const app = express()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

app.use(bodyParser.json())

app.post('/ask', async (req, res) => {
  const { question } = req.body
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: question }]
    })
    res.json({ answer: response.choices[0].message.content })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(3000, () => console.log('🚀 Serveur IA lancé sur http://localhost:3000'))
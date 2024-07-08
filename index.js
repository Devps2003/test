const { GoogleGenerativeAI } = require("@google/generative-ai");
const express= require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.json())

const api_key = "AIzaSyDnexnktKOTR8Dcyx9FFYfWdbSGWDyX92c";
const genAI = new GoogleGenerativeAI(api_key);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

app.post('/getSymbol', async(req,res)=>{
    const userInput = req.body.input;

    const systemPrompt = `You are a stock market specialist. Your task is to process a person's query in natural language and identify the stock symbol they are referring to. The query will mention a company they are investing in. You should only return the stock symbol in uppercase letters.

User's query is: ${userInput}

Example Query:
"I am investing money on Apple today."

Example Answer:
"AAPL"

Important Instructions:

Only return the stock symbol.
Ensure the symbol is in uppercase.
Do not add a newline at the end of the response.

`

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const ans = response.text();
    return res.text();
})


app.listen(port,()=>{
    console.log(`server running on ${port}`);
})
import express, { static as _static, json} from 'express';
import axios from 'axios';
import path from 'path';
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { month_obj_full, month_obj_short } from './utils.js';

// Enabling dotenv
dotenv.config();

// Defining port and bot token
const PORT = process.env.PORT;
const BOT_TOKEN = process.env.BOT_TOKEN;

// Defining express app
const app = express();

// Apps that express will use
app.use(_static('static'));
app.use(json());

// Telegraf defined here
const bot = new Telegraf(BOT_TOKEN);


// Root api endpoint
app.get('/', (req, res)=>{
    res.status(200).send('Hello World');
})

app.listen(PORT, ()=>{
    console.log(`Server is listening to port ${PORT}`);
})

bot.launch();

// Bot commands go here
bot.command('start', ctx => {
    console.log(ctx.from);
    bot.telegram.sendMessage(ctx.chat.id, 'Hello there! Welcome to Srimantaha telegram bot. I respond to /transit. Please try it.', {})
})

bot.command('transit', ctx => {
    const date = new Date();
    const month = month_obj_full[date.getMonth()];

    const message = `Hello. Today, on ${date.getDate()} ${month} ${date.getFullYear()}, at ${date.getHours()}:${date.getMinutes()}, Sun is currently in ${29}\u00B0${31}\u0027 Scorpio and Moon is currenty in ${10}\u00B0${12}\u0027 Leo.`;

    bot.telegram.sendMessage(ctx.chat.id, message, {});
})
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const http = require('http');

const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const PORT = process.env.PORT || 8000;

if (!TOKEN || !CHAT_ID) {
	throw new Error('BOT_TOKEN or CHAT_ID is not set');
}

// Telegram bot
const bot = new TelegramBot(TOKEN, { polling: true });

// Cron jobs
cron.schedule(
	'00 09 * * 1-5',
	() => {
		bot.sendMessage(
			CHAT_ID,
			'Доброе утро! ☀️ Начинаем рабочий день 🏠👨‍💻\nНе забудьте нажать кнопку «Начать рабочий день» в Bitrix24.',
		);
	},
	{ timezone: 'Europe/Moscow' },
);

cron.schedule(
	'05 18 * * 1-5',
	() => {
		bot.sendMessage(
			CHAT_ID,
			'Рабочий день завершён! ✅\nНе забудьте отметить это в Bitrix24. Отличного вечера! 😊',
		);
	},
	{ timezone: 'Europe/Moscow' },
);

// Commands
bot.onText(/\/start/, (msg) => {
	bot.sendMessage(
		msg.chat.id,
		'Привет! Я бот DN.ru 👋\nБуду присылать уведомления о начале и конце рабочего дня.',
	);
});

// Telegram polling errors
bot.on('polling_error', (err) => {
	console.error('❌ Polling error:', err.message);
});

// Health check server (Koyeb requirement)
http
	.createServer((req, res) => {
		res.writeHead(200);
		res.end('OK');
	})
	.listen(PORT, () => {
		console.log(`🌐 Health check server on port ${PORT}`);
	});

console.log('🤖 Бот запущен...');

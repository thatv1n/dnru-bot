require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');

const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const bot = new TelegramBot(TOKEN, { polling: true });
const workDayDone = 'https://i.imgur.com/XwIe1vC.jpeg';

cron.schedule(
	'00 09 * * 1-5',
	() => {
		bot.sendMessage(
			CHAT_ID,
			'Доброе утро! ☀️ Начинаем рабочий день 🏠👨‍💻Не забудьте нажать кнопку «Начать рабочий день» в Bitrix24. Продуктивного и удачного дня! 😊',
		);
	},
	{
		timezone: 'Europe/Moscow',
	},
);

cron.schedule(
	'00 18 * * 1-5',
	() => {
		bot.sendMessage(
			CHAT_ID, // ID чата (группы)
			'Рабочий день завершён! ✅ Не забудьте отметить это в Bitrix24. Отличного вечера! 😊',
		);
	},
	{
		timezone: 'Europe/Moscow',
	},
);

bot.onText(/\/start/, (msg) => {
	bot.sendMessage(
		msg.chat.id,
		'Привет! Я бот DN.ru, буду присылать вам сообщения о начале рабочего дня и его завершении, каждый будний день. 🚀',
	);
});

// cron.schedule(
// 	'00 09 * * 1-5',
// 	() => {
// 		bot.sendMessage(
// 			'-4605567973',
// 			'Доброе утро! ☀️ Начинаем рабочий день 🏠👨‍💻Не забудьте нажать кнопку «Начать рабочий день» в Bitrix24. Продуктивного и удачного дня! 😊',
// 		);
// 	},
// 	{
// 		timezone: 'Europe/Moscow',
// 	},
// );

// cron.schedule(
// 	'00 18 * * 1-5',
// 	() => {
// 		bot.sendPhoto(
// 			'-4605567973', // ID чата (группы)
// 			workDayDone,
// 			{
// 				caption:
// 					'Рабочий день завершён! ✅ Не забудьте отметить это в Bitrix24. Отличного вечера! 😊',
// 			},
// 		);
// 	},
// 	{
// 		timezone: 'Europe/Moscow',
// 	},
// );

console.log('🤖 Бот запущен...');

process.on('uncaughtException', (err) => {
	console.error('❌ Необработанная ошибка:', err);
});

process.on('unhandledRejection', (reason, promise) => {
	console.error('❌ Обещание не выполнено:', reason);
});

setInterval(
	() => {
		console.log('✅ Бот активен, Railway не засыпает');
	},
	60 * 60 * 1000,
);

const TelegramBot = require('node-telegram-bot-api');

// توکن ربات خودت رو اینجا قرار بده
// توکن رو از @BotFather گرفتیم - جای YOUR_BOT_TOKEN_HERE رو عوض کن
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';

// ایجاد ربات
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// وقتی کاربر /start رو می‌زنه
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name;
    
    const welcomeMessage = `
سلام ${userName}! 🌟

به ربات خوشامدگویی Node.js خوش آمدید!

دستورات موجود:
/start - نمایش این پیام
/about - درباره ربات
    `;
    
    bot.sendMessage(chatId, welcomeMessage);
    console.log(`کاربر ${userName} ربات رو استارت کرد`);
});

// دستور /about
bot.onText(/\/about/, (msg) => {
    const chatId = msg.chat.id;
    const aboutText = `
🤖 درباره این ربات:

این یک ربات آزمایشی ساخته شده با:
- Node.js
- node-telegram-bot-api
- GitHub + Termux

ساخته شده برای آموزش!
    `;
    
    bot.sendMessage(chatId, aboutText);
});

// پاسخ به همه پیام‌های معمولی
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name;
    const text = msg.text;
    
    // اگر پیام دستور نبود (مثل /start) پاسخ بده
    if (!text.startsWith('/')) {
        const response = `
سلام ${userName}! 👋

پیام شما: "${text}"

من یک ربات ساده هستم که با Node.js نوشته شدم!
        `;
        bot.sendMessage(chatId, response);
        console.log(`پیام از ${userName}: ${text}`);
    }
});

// هندل کردن خطاها
bot.on('polling_error', (error) => {
    console.log('❌ خطا در ربات:', error.message);
});

bot.on('webhook_error', (error) => {
    console.log('❌ خطا در وب‌هوک:', error.message);
});

// وقتی ربات اجرا می‌شه
console.log('✅ ربات تلگرام فعال شد!');
console.log('🤖 در حال گوش دادن به پیام‌ها...');
console.log('⏹️  برای توقف: Ctrl + C');

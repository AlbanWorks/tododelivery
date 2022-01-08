const { Telegraf } = require('telegraf')
//debo guardar el token en una variable de entorno --> process.env.BOT_TOKEN
const bot = new Telegraf('5079902652:AAFX8bBD_cpqxAUA1JZf2UfOiqfBmYGuts4')
bot.start((ctx) => ctx.reply('aerodrom'))
bot.launch()
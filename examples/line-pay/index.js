const { LineBot } = require('bottender');
const { createServer } = require('bottender/express');
const { LinePay } = require('messaging-api-line');

const bot = new LineBot({
  channelSecret: '__FILL_YOUR_SECRET_HERE__',
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});

const linePay = new LinePay({
  channelId: '__FILL_YOUR_LINE_PAY_ID_HERE__',
  channelSecret: '__FILL_YOUR_LINE_PAY_SECRET_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot);

server.post('/reserve', () => {
  linePay.reserve({});
});
server.post('/confirm', () => {
  linePay.confirm({});
});

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});

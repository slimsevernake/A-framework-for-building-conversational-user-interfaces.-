import { LineClient } from 'messaging-api-line';
import { MessengerClient } from 'messaging-api-messenger';
import { SlackOAuthClient } from 'messaging-api-slack';
import { TelegramClient } from 'messaging-api-telegram';
import { ViberClient } from 'messaging-api-viber';

import LineBot from './line/LineBot';
import MessengerBot from './messenger/MessengerBot';
import SlackBot from './slack/SlackBot';
import SmsBot from './sms/SmsBot';
import TelegramBot from './telegram/TelegramBot';
import TwilioClient from './sms/TwilioClient';
import ViberBot from './viber/ViberBot';
import WhatsappBot from './whatsapp/WhatsappBot';
import getBottenderConfig from './shared/getBottenderConfig';
import getSessionStore from './getSessionStore';
import { Channel } from './types';

const BOT_MAP = {
  messenger: MessengerBot,
  line: LineBot,
  slack: SlackBot,
  telegram: TelegramBot,
  viber: ViberBot,
  whatsapp: WhatsappBot,
  sms: SmsBot,
};

function getClient<C extends string>(
  channel: C
): C extends 'messenger'
  ? MessengerClient
  : C extends 'line'
  ? LineClient
  : C extends 'slack'
  ? SlackOAuthClient
  : C extends 'telegram'
  ? TelegramClient
  : C extends 'viber'
  ? ViberClient
  : C extends 'whatsapp'
  ? TwilioClient
  : C extends 'sms'
  ? TwilioClient
  : any {
  const { channels = {} } = getBottenderConfig();
  const sessionStore = getSessionStore();

  const channelConfig = (channels as Record<string, any>)[channel];

  if (!channelConfig) {
    throw new Error(
      `getClient: ${channel} config is missing in \`bottender.config.js\`.`
    );
  }

  const ChannelBot = BOT_MAP[channel as Channel];

  const channelBot = new ChannelBot({
    ...channelConfig,
    sessionStore,
  } as any);

  return channelBot.connector.client as any;
}

export default getClient;

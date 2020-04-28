import Bot from '../bot/Bot';
import SessionStore from '../session/SessionStore';
import TwilioClient from '../sms/TwilioClient';

import WhatsappConnector, { WhatsappRequestBody } from './WhatsappConnector';
import WhatsappContext from './WhatsappContext';
import WhatsappEvent from './WhatsappEvent';

export default class WhatsappBot extends Bot<
  WhatsappRequestBody,
  TwilioClient,
  WhatsappEvent,
  WhatsappContext
> {
  constructor({
    accountSid,
    authToken,
    phoneNumber,
    sessionStore,
    sync,
    origin,
  }: {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
    sessionStore?: SessionStore;
    sync?: boolean;
    origin?: string;
  }) {
    const connector = new WhatsappConnector({
      accountSid,
      authToken,
      phoneNumber,
      origin,
    });
    super({ connector, sessionStore, sync });
  }
}

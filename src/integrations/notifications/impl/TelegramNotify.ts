import {Notify} from "@notifications/Notify";
import {Notification} from "@type/notification/Notification";
import {List} from "immutable";
import {injectable} from "inversify";
import TelegramBot from "node-telegram-bot-api";
import "reflect-metadata";

const regex = new RegExp("/start");

@injectable()
export class TelegramNotify implements Notify {
  private telegramBot: TelegramBot;
  private chatroomIDs: List<number> = List().asMutable();

  public start(token: string): void {
    this.telegramBot = new TelegramBot(token, {polling: true});
    this.telegramBot.onText(regex, async (msg: TelegramBot.Message) => {
      const chatId = msg.chat.id;
      if (this.chatroomIDs.contains(chatId)) {
        this.telegramBot.sendMessage(chatId, "The notification service is running").catch(console.error);
      } else {
        this.chatroomIDs.push(chatId);
        this.telegramBot.sendMessage(chatId, "started the notification service").catch(console.error);
      }
    });
  }

  public newPullRequest(notification: Notification): Promise<void> {
    // TODO
    return undefined;
  }

  public updatedPullRequest(notification: Notification): Promise<void> {
    // TODO
    return undefined;
  }

  public revisionNeeded(notification: Notification): Promise<void> {
    // TODO
    return undefined;
  }

  public autoMerging(notification: Notification): Promise<void> {
    // TODO
    return undefined;
  }
}

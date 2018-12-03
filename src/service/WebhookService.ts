import {BeanTypes} from "@constants/BeanType";
import {appContainer} from "@di/appContainer";
import {Webhook} from "@repositories/webhook/Webhook";
import {Notification} from "@type/notification/Notification";

export class WebhookService {
  private webhook = appContainer.get<Webhook>(BeanTypes.WEBHOOK);

  public process(hook): Promise<Notification> {
    if (this.webhook.isPullRequest(hook)) {
      return this.webhook.processPullRequest(hook);
    } else if (this.webhook.isComment(hook)) {
      return this.webhook.processComment(hook);
    }
  }
}

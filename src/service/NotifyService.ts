import {BeanTypes} from "@constants/BeanType";
import {NotificationType} from "@constants/NotificationType";
import {appContainer} from "@di/appContainer";
import {Notify} from "@notifications/Notify";
import {Notification} from "@type/notification/Notification";

export class NotifyService {
  private notify = appContainer.get<Notify>(BeanTypes.NOTIFY);
  private readonly token: string;

  constructor(token: string = "") {
    this.token = token;
    this.token !== token && this.notify.start(this.token);
  }

  public async process(notification: Notification): Promise<void> {
    if (!notification || this.token === "") {
      return;
    }

    switch (notification.type) {
      case NotificationType.AWAIT_REVIEWER:
        return this.notify.newPullRequest(notification);
      case NotificationType.UPDATE:
        return this.notify.updatedPullRequest(notification);
      case NotificationType.REVISION_NEEDED:
        return this.notify.revisionNeeded(notification);
      case NotificationType.AWAIT_AUTO_MERGE:
        return this.notify.autoMerging(notification);
      default:
        return;
    }
  }
}

import {Notification} from "@type/notification/Notification";

export interface Webhook {
  isPullRequest(hook): boolean;
  isComment(hook): boolean;
  processPullRequest(hook): Promise<Notification>;
  processComment(hook): Promise<Notification>;
}

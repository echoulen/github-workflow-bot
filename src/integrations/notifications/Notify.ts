import {Notification} from "@type/notification/Notification";

export interface Notify {
  start(token: string): void;
  newPullRequest(notification: Notification): Promise<void>;
  updatedPullRequest(notification: Notification): Promise<void>;
  revisionNeeded(notification: Notification): Promise<void>;
  autoMerging(notification: Notification): Promise<void>;
}

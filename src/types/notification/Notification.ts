import {NotificationType} from "@constants/NotificationType";
import {Set} from "immutable";

export interface Notification {
  username: string;
  avatarUrl: string;
  title: string;
  description: string;
  link: string;
  type: NotificationType;
  contribution: Set<string>;
}

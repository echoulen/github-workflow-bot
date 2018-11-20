import {NotificationType} from "@constants/NotificationType";

export interface Notification {
  username: string;
  avatarUrl: string;
  title: string;
  description: string;
  link: string;
  type: NotificationType;
}

export interface Webhook {
  isPullRequest(hook): boolean;
  isComment(hook): boolean;
  processPullRequest(hook): Promise<void>;
  processComment(hook): Promise<void>;
}

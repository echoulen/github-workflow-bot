export interface Webhook {
  isMergeRequest(hook): boolean;
  isComment(hook): boolean;
  processPullRequest(): void;
  processComment(): void;
}

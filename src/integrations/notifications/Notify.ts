export interface Notify {
  newPullRequest(pullRequest): Promise<void>;
  updatedPullRequest(pullRequest): Promise<void>;
  revisionNeeded(pullRequest, hook): Promise<void>;
  autoMerging(pullRequest, reviewers): Promise<void>;
}

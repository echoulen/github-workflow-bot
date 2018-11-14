import {List} from "immutable";

export interface ApiExecutor {
  getCurrentUser<User>(): Promise<User>;
  addComment<Comment>(project, pr, comment: string): Promise<Comment>;
  getComments<Comment>(project, pr): Promise<List<Comment>>;
  setLabel(project, pr, labels: string): Promise<void>;
  merge(project, pr): Promise<void>;
}

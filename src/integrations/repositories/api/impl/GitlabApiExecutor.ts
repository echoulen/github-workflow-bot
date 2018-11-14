import {ConfigManager} from "@config/ConfigManager";
import {ApiExecutor} from "@repositories/api/ApiExecutor";
import axios from "axios";
import {List} from "immutable";
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export class GitlabApiExecutor implements ApiExecutor {

  private readonly url = ConfigManager.getConfig().repository.url;
  private readonly headers = {"PRIVATE-TOKEN": ConfigManager.getConfig().repository.token};

  public async getCurrentUser<User>(): Promise<User> {
    const res = await axios.get(`${this.url}/api/v4/user`, {headers: this.headers});
    return res.data;
  }

  public async addComment<T>(project, pr, comment: string): Promise<T> {
    const res = await axios.post(
      `${this.url}/api/v4/projects/${project}/merge_requests/${pr}/notes`,
      {body: comment},
      {headers: this.headers},
    );
    return res.data;
  }

  public async getComments<T>(project, pr): Promise<List<T>> {
    const res = await axios.get(`${this.url}/api/v4/projects/${project}/merge_requests/${pr}/notes`, {headers: this.headers});
    return List<T>(res.data);
  }

  public async setLabel(project, pr, labels: string): Promise<void> {
    await axios.put(
      `${this.url}/api/v4/projects/${project}/merge_requests/${pr}`,
      {labels},
      {headers: this.headers},
    );
  }

  public async merge(project, pr): Promise<void> {
    await axios.put(`${this.url}/api/v4/projects/${project}/merge_requests/${pr}/merge`, {}, {headers: this.headers});
  }
}

import {ConfigManager} from "@config/ConfigManager";
import {GitlabApiExecutor} from "@repositories/api/impl/GitlabApiExecutor";
import {MockComments} from "@tests/test-helper/mock-data/MockComments";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("GitlabApiExecutor spec", () => {
  const apiExecutor = new GitlabApiExecutor();
  const url = ConfigManager.getConfig().repository.url;
  const project = 123;
  const pr = 54088;

  beforeAll(() => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${url}/api/v4/user`).reply(200, {id: 123, name: "test-user"});
    mock.onPost(`${url}/api/v4/projects/${project}/merge_requests/${pr}/notes`).reply(200, {id: 54088, body: "test comment"});
    mock.onGet(`${url}/api/v4/projects/${project}/merge_requests/${pr}/notes`).reply(200, MockComments);
  });

  it("should getCurrentUser proper", async () => {
    const user = await apiExecutor.getCurrentUser();
    expect(user).toMatchSnapshot();
  });

  it("should addComment proper", async () => {
    const comment = await apiExecutor.addComment(project, pr, "test comment");
    expect(comment).toMatchSnapshot();
  });

  it("should getComments proper", async () => {
    const comments = await apiExecutor.getComments(project, pr);
    expect(comments.toArray()).toMatchSnapshot();
  });
});

import {ConfigManager} from "@config/ConfigManager";
import {GitlabApiExecutor} from "@repositories/api/impl/GitlabApiExecutor";
import {MockComments} from "@tests/test-helper/mock-data/gitlab/MockComments";
import {MockMergeRequest} from "@tests/test-helper/mock-data/gitlab/MockMergeRequest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("GitlabApiExecutor spec", () => {
  const apiExecutor = new GitlabApiExecutor();
  const url = ConfigManager.getConfig().repository.url;
  const project = 123;
  const pr = 54088;
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock.onGet(`${url}/api/v4/user`).reply(200, {id: 123, name: "test-user"});
    mock.onGet(`${url}/api/v4/projects/${project}/merge_requests/${pr}`).reply(200, MockMergeRequest);
    mock.onPost(`${url}/api/v4/projects/${project}/merge_requests/${pr}/notes`).reply(200, {id: 54088, body: "test comment"});
    mock.onGet(`${url}/api/v4/projects/${project}/merge_requests/${pr}/notes`).reply(200, MockComments);
  });

  it("should getBotUser proper", async () => {
    const user = await apiExecutor.getBotUser();
    expect(user).toMatchSnapshot();
  });

  it("should getPullRequest proper", async () => {
    const pullRequest = await apiExecutor.getPullRequest(project, pr);
    expect(pullRequest).toMatchSnapshot();
  });

  it("should addComment proper", async () => {
    const comment = await apiExecutor.addComment(project, pr, "test comment");
    expect(comment).toMatchSnapshot();
  });

  it("should getComments proper", async () => {
    const comments = await apiExecutor.getComments(project, pr);
    expect(comments.toArray()).toMatchSnapshot();
  });

  afterAll(() => {
    mock.reset();
    mock.restore();
  });
});

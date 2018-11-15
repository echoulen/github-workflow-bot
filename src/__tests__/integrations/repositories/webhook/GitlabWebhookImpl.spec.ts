import {ConfigManager} from "@config/ConfigManager";
import {BeanTypes} from "@constants/BeanType";
import {appContainer} from "@di/appContainer";
import {GitlabApiExecutor} from "@repositories/api/impl/GitlabApiExecutor";
import {Webhook} from "@repositories/webhook/Webhook";
import {MockMergeRequestHook} from "@tests/test-helper/mock-data/gitlab/hook/MockMergeRequestHook";
import {MockNoteHook} from "@tests/test-helper/mock-data/gitlab/hook/MockNoteHook";
import {MockMergeRequest} from "@tests/test-helper/mock-data/gitlab/MockMergeRequest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import sinon from "sinon";

describe("GitlabWebhookImpl spec", () => {
  const url = ConfigManager.getConfig().repository.url;
  const project = 123;
  const pr = 54088;
  const webhook = appContainer.get<Webhook>(BeanTypes.WEBHOOK);
  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.onGet(`${url}/api/v4/user`).reply(200, {id: 123, name: "bot-user", username: "bot"});
    mock.onGet(`${url}/api/v4/projects/${project}/merge_requests/${pr}`).reply(200, MockMergeRequest);
  });

  it("should isPullRequest proper", () => {
    const result = webhook.isPullRequest(MockMergeRequestHook);
    expect(result).toBe(true);

    const result2 = webhook.isPullRequest(MockNoteHook);
    expect(result2).toBe(false);
  });

  it("should isComment proper", () => {
    const result = webhook.isComment(MockMergeRequestHook);
    expect(result).toBe(false);

    const result2 = webhook.isComment(MockNoteHook);
    expect(result2).toBe(true);
  });

  it("should processPullRequest proper", async () => {
    const mockMethod = sinon.mock(GitlabApiExecutor.prototype);
    mockMethod.expects("setLabel").once().returns(new Promise((resolve) => resolve()));
    await webhook.processPullRequest(MockMergeRequestHook);
    mockMethod.verify();
    mockMethod.restore();
  });

  afterAll(() => {
    mock.reset();
    mock.restore();
  });
});

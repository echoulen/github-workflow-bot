import {ConfigManager} from "@config/ConfigManager";
import {BeanTypes} from "@constants/BeanType";
import {ApiExecutor} from "@repositories/api/ApiExecutor";
import {GitlabApiExecutor} from "@repositories/api/impl/GitlabApiExecutor";
import {GitlabWebhookImpl} from "@repositories/webhook/impl/GitlabWebhookImpl";
import {Webhook} from "@repositories/webhook/Webhook";
import {MockMergeRequestHook} from "@tests/test-helper/mock-data/gitlab/hook/MockMergeRequestHook";
import {MockNoteHook} from "@tests/test-helper/mock-data/gitlab/hook/MockNoteHook";
import {MockComments} from "@tests/test-helper/mock-data/gitlab/MockComments";
import {MockLGTMComments} from "@tests/test-helper/mock-data/gitlab/MockLGTMComments";
import {MockMergeRequest} from "@tests/test-helper/mock-data/gitlab/MockMergeRequest";
import {NoteHook} from "@type/gitlab/NoteHook";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {Container} from "inversify";
import sinon from "sinon";

describe("GitlabWebhookImpl spec", () => {
  jest.useFakeTimers();
  const url = ConfigManager.getConfig().repository.url;
  const project = 123;
  const pr = 54088;
  const mock = new MockAdapter(axios);
  let appContainer: Container;
  let webhook: Webhook;

  beforeAll(() => {
    appContainer = new Container();
    appContainer.bind<Webhook>(BeanTypes.WEBHOOK).to(GitlabWebhookImpl).inSingletonScope();
    appContainer.bind<ApiExecutor>(BeanTypes.API_EXECUTOR).to(GitlabApiExecutor).inSingletonScope();
    webhook = appContainer.get<Webhook>(BeanTypes.WEBHOOK);

    mock.onGet(`${url}/api/v4/user`).reply(200, {id: 123, name: "bot-user", username: "bot"});
    mock.onGet(`${url}/api/v4/projects/${project}/merge_requests/${pr}`).reply(200, MockMergeRequest);
    mock.onGet(`${url}/api/v4/projects/${project}/merge_requests/${pr}/notes`).reply(200, MockComments);

    mock.onGet(`${url}/api/v4/projects/23/merge_requests/1267`).reply(200, MockMergeRequest);
    mock.onGet(`${url}/api/v4/projects/23/merge_requests/1267/notes`).reply(200, MockLGTMComments);
    mock.onPut(`${url}/api/v4/projects/23/merge_requests/1267`).reply(200, {});
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
    const notify = await webhook.processPullRequest(MockMergeRequestHook);
    expect(notify).toMatchSnapshot();
    mockMethod.verify();
    mockMethod.restore();
  });

  it("should processComment proper with DiscussionNote", async () => {
    const mockMethod = sinon.mock(GitlabApiExecutor.prototype);
    mockMethod.expects("setLabel").once().returns(new Promise((resolve) => resolve()));
    mockMethod.expects("merge").never().returns(new Promise((resolve) => resolve()));
    const notify = await webhook.processComment(MockNoteHook);
    expect(notify).toMatchSnapshot();
    mockMethod.verify();
    mockMethod.restore();
  });

  it("should processComment proper with LGTM", async () => {
    const mockMethod = sinon.mock(GitlabApiExecutor.prototype);
    mockMethod.expects("setLabel").once().returns(new Promise((resolve) => resolve()));
    mockMethod.expects("merge").never().returns(new Promise((resolve) => resolve()));
    const notify = await webhook.processComment(MockNoteHook);
    expect(notify).toMatchSnapshot();
    mockMethod.verify();
    mockMethod.restore();
  });

  it("should processComment proper with LGTM and auto merge", async () => {
    const mockMethod = sinon.mock(GitlabApiExecutor.prototype);
    mockMethod.expects("setLabel").once().returns(new Promise((resolve) => resolve()));
    mockMethod.expects("addComment").once().returns(new Promise((resolve) => resolve()));
    mockMethod.expects("merge").once().returns(new Promise((resolve) => resolve()));

    const lgtmNoteHook: NoteHook = {
      ...MockNoteHook,
      object_attributes: {
        ...MockNoteHook.object_attributes,
        note: "lgtm !!",
        type: "note",
      },
    };
    const notify = await webhook.processComment(lgtmNoteHook);
    expect(notify).toMatchSnapshot();
    jest.advanceTimersByTime(25000);
    mockMethod.verify();
    mockMethod.restore();
  });

  afterAll(() => {
    appContainer.restore();
    mock.reset();
    mock.restore();
  });
});

import {BeanTypes} from "@constants/BeanType";
import {Label} from "@constants/Label";
import {ApiExecutor} from "@repositories/api/ApiExecutor";
import {updateLabels} from "@repositories/utils/updateLabels";
import {Webhook} from "@repositories/webhook/Webhook";
import {MergeRequest} from "@type/gitlab/MergeRequest";
import {MergeRequestHook} from "@type/gitlab/MergeRequestHook";
import {NoteHook} from "@type/gitlab/NoteHook";
import {User} from "@type/gitlab/User";
import {List} from "immutable";
import {inject, injectable} from "inversify";
import "reflect-metadata";

@injectable()
export class GitlabWebhookImpl implements Webhook {

  @inject(BeanTypes.API_EXECUTOR)
  private apiExecutor: ApiExecutor;

  public isPullRequest(hook: MergeRequestHook): boolean {
    return hook.object_kind === "merge_request";
  }

  public isComment(hook: NoteHook): boolean {
    return hook.object_kind === "note";
  }

  public async processPullRequest(hook: MergeRequestHook): Promise<void> {
    const projectId = hook.object_attributes.source_project_id;
    const mergeRequestId = hook.object_attributes.iid;
    const triggerBranch = hook.object_attributes.target_branch;
    const labels: List<string> = List(hook.labels).map<string>((it) => it.title);
    const defaultBranch = hook.project.default_branch;
    const bot = await this.apiExecutor.getBotUser<User>();
    const mergeRequest = await this.apiExecutor.getPullRequest<MergeRequest>(projectId, mergeRequestId);

    if (!mergeRequestId || triggerBranch !== defaultBranch) {
      return;
    }

    if (hook.object_attributes.action === "open") {
      const username = hook.user.username;
      await this.apiExecutor.addComment(
        projectId,
        mergeRequestId,
        `@${username} Thank you for submitting this PR!, please waiting for reviewers.`,
      );
      const newLabels = updateLabels(labels.toArray(), [Label.AWAIT_REVIEWER], []);
      await this.apiExecutor.setLabel(projectId, mergeRequestId, newLabels);
    } else if (
      hook.object_attributes.action === "update" &&
      hook.user.username !== bot.username &&
      mergeRequest.author.username === hook.user.username &&
      List(labels).contains(Label.REVISION_NEEDED)) {
      const newLabels = updateLabels(labels.toArray(), [Label.UPDATED], [Label.REVISION_NEEDED]);
      await this.apiExecutor.setLabel(projectId, mergeRequestId, newLabels);
    }
  }

  public processComment(): void {
    // TODO
  }
}

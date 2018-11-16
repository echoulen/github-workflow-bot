import {ConfigManager} from "@config/ConfigManager";
import {BeanTypes} from "@constants/BeanType";
import {Label} from "@constants/Label";
import {Message} from "@constants/Message";
import {ApiExecutor} from "@repositories/api/ApiExecutor";
import {updateLabels} from "@repositories/utils/updateLabels";
import {Webhook} from "@repositories/webhook/Webhook";
import {Comment} from "@type/gitlab/Comment";
import {MergeRequest} from "@type/gitlab/MergeRequest";
import {MergeRequestHook} from "@type/gitlab/MergeRequestHook";
import {NoteHook} from "@type/gitlab/NoteHook";
import {User} from "@type/gitlab/User";
import {List} from "immutable";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {sprintf} from "sprintf-js";

@injectable()
export class GitlabWebhookImpl implements Webhook {

  @inject(BeanTypes.API_EXECUTOR)
  private apiExecutor: ApiExecutor;
  private config = ConfigManager.getConfig();
  private autoMergeSec = 25;

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
        sprintf(Message.AWAIT_REVIEWER, username),
      );
      const newLabels = updateLabels(labels, [Label.AWAIT_REVIEWER], []);
      await this.apiExecutor.setLabel(projectId, mergeRequestId, newLabels);
    } else if (
      hook.object_attributes.action === "update" &&
      hook.user.username !== bot.username &&
      mergeRequest.author.username === hook.user.username &&
      List(labels).contains(Label.REVISION_NEEDED)) {

      const newLabels = updateLabels(labels, [Label.UPDATED], [Label.REVISION_NEEDED]);
      await this.apiExecutor.setLabel(projectId, mergeRequestId, newLabels);
    }
  }

  public async processComment(hook: NoteHook): Promise<void> {
    const bot = await this.apiExecutor.getBotUser<User>();

    if (hook.object_attributes.noteable_type !== "MergeRequest") {
      return;
    }

    if (hook.user.username === bot.username) {
      return;
    }

    const projectId = hook.merge_request.target_project_id;
    const mergeRequestId = hook.merge_request.iid;
    const mergeRequest = await this.apiExecutor.getPullRequest<MergeRequest>(projectId, mergeRequestId);
    const labels = List<string>(mergeRequest.labels);

    if (hook.merge_request.work_in_progress || hook.merge_request.merge_status !== "can_be_merged") {
      return;
    }

    if (hook.object_attributes.type === "DiscussionNote" || hook.object_attributes.type === "DiffNote") {
      await this.apiExecutor.setLabel(
        projectId,
        mergeRequestId,
        updateLabels(labels, [Label.REVISION_NEEDED], [Label.AWAIT_REVIEWER, Label.UPDATED, Label.AWAIT_AUTO_MERGE, Label.ONE_LGTM]),
      );
    } else if (hook.object_attributes.note.toUpperCase().includes("LGTM")) {

      const comments = await this.apiExecutor.getComments<Comment>(projectId, mergeRequestId);
      const lgtmReviewers = comments.filter((it) => it.body.toUpperCase().includes("LGTM")).map((comment) => comment.author.name).toSet();
      const currentLgtmCount = lgtmReviewers.count();
      const awaitAutoMergeMessage = sprintf(Message.AWAIT_AUTO_MERGE, this.autoMergeSec);
      const triggerMessage = comments.find((it) => it.body === awaitAutoMergeMessage);

      if (currentLgtmCount >= this.config.lgtm.count && !triggerMessage) {
        await this.apiExecutor.addComment(projectId, mergeRequestId, awaitAutoMergeMessage);
        const cleanLabels = updateLabels(
          labels,
          [Label.AWAIT_AUTO_MERGE],
          [Label.AWAIT_REVIEWER, Label.ONE_LGTM, Label.REVISION_NEEDED, Label.UPDATED],
        );
        await this.apiExecutor.setLabel(projectId, mergeRequestId, cleanLabels);

        setTimeout(async () => {
          await this.apiExecutor.merge(projectId, mergeRequestId);
          const finalMergeRequest = await this.apiExecutor.getPullRequest<MergeRequest>(projectId, mergeRequestId);
          const finalLabels = List<string>(finalMergeRequest.labels);
          const finalNewLabels = updateLabels(finalLabels, [], [Label.AWAIT_AUTO_MERGE, Label.ONE_LGTM, Label.UPDATED]);
          await this.apiExecutor.setLabel(projectId, mergeRequestId, finalNewLabels);
        }, this.autoMergeSec * 1000);
      } else {
        const newLabels = updateLabels(labels, [Label.AWAIT_REVIEWER, Label.ONE_LGTM], [Label.REVISION_NEEDED]);
        await this.apiExecutor.setLabel(projectId, mergeRequestId, newLabels);
      }
    }
  }
}

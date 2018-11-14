import {Webhook} from "@repositories/webhook/Webhook";
import {MergeRequestHook} from "@type/gitlab/MergeRequestHook";
import {NoteHook} from "@type/gitlab/NoteHook";
import {injectable} from "inversify";

@injectable()
export class GitlabWebhookImpl implements Webhook {
  public isMergeRequest(hook: MergeRequestHook): boolean {
    return hook.object_kind === "merge_request";
  }

  public isComment(hook: NoteHook): boolean {
    return hook.object_kind === "note";
  }

  public processPullRequest(): void {
    // TODO
  }

  public processComment(): void {
    // TODO
  }
}

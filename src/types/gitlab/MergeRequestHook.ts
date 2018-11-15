export interface MergeRequestHook {
  object_kind: "merge_request";
  event_type: "merge_request";
  user: {
    name: string;
    username: string;
    avatar_url: string;
  };
  project: {
    id: number,
    name: string;
    description: string;
    web_url: string;
    avatar_url: string;
    git_ssh_url: string;
    git_http_url: string;
    namespace: string;
    visibility_level: number;
    path_with_namespace: string;
    default_branch: string;
    ci_config_path: string;
    homepage: string;
    url: string;
    ssh_url: string;
    http_url: string;
  };
  object_attributes: {
    id: number;
    target_branch: string;
    source_branch: string;
    source_project_id: number;
    author_id: number;
    assignee_id: number;
    title: string;
    created_at: string;
    updated_at: string;
    milestone_id: number;
    state: "opened" | "closed" | "merged";
    merge_status: "can_be_merged" | "can_not_be_merged",
    target_project_id: number;
    iid: number;
    description: string;
    updated_by_id: number;
    merge_error: any;
    merge_params: {
      force_remove_source_branch: string;
    };
    merge_when_pipeline_succeeds: boolean;
    merge_user_id: number;
    merge_commit_sha: string;
    deleted_at?: any;
    in_progress_merge_commit_sha?: string;
    lock_version?: string;
    time_estimate: number;
    last_edited_at: string;
    last_edited_by_id: number;
    head_pipeline_id: number;
    ref_fetched?: boolean;
    merge_jid?: number;
    source: {
      id: number;
      name: string;
      description: string;
      web_url: string;
      avatar_url: string;
      git_ssh_url: string;
      git_http_url: string;
      namespace: string;
      visibility_level: number;
      path_with_namespace: string;
      default_branch: string;
      ci_config_path: string;
      homepage: string;
      url: string;
      ssh_url: string;
      http_url: string;
    };
    target: {
      id: number;
      name: string;
      description: string;
      web_url: string;
      avatar_url: string;
      git_ssh_url: string;
      git_http_url: string;
      namespace: string;
      visibility_level: number;
      path_with_namespace: string;
      default_branch: string;
      ci_config_path: string;
      homepage: string;
      url: string;
      ssh_url: string;
      http_url: string;
    };
    last_commit: {
      id: string;
      message: string;
      timestamp: string;
      url: string;
      author: {
        name: string;
        email: string;
      };
    };
    work_in_progress: boolean;
    total_time_spent: number;
    human_total_time_spent: number;
    human_time_estimate: number;
    url: string;
    action: "open" | "update";
  };
  labels: Array<{
    id: number;
    title: string;
    color: string;
    project_id: number;
    created_at: string;
    updated_at: string;
    template: boolean;
    description: string;
    type: string;
    group_id: number;
  }>;
  changes?: {
    labels: {
      previous: any[],
      current: any[],
    },
  };
  repository: {
    name: string;
    url: string;
    description: string;
    homepage: string;
  };
}

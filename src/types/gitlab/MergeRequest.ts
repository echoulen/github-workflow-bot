export interface MergeRequest {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: "opened" | "merged" | "closed";
  created_at: string;
  updated_at: string;
  target_branch: string;
  source_branch: string;
  upvotes: number;
  downvotes: number;
  author: {
    id: number;
    name: string;
    username: string;
    state: "active" | any;
    avatar_url: string;
    web_url: string;
  };
  squash: boolean;
  assignee: string;
  changes_count: string;
  source_project_id: number;
  target_project_id: number;
  labels: string[];
  merged_by?: {
    id: number;
    name: string;
    username: string;
    state: "active";
    avatar_url: string;
    web_url: string;
  };
  merged_at?: string;
  closed_by: string;
  closed_at: string;
  latest_build_started_at: string;
  latest_build_finished_at: string;
  first_deployed_to_production_at: string;
  pipeline: {
    id: number;
    sha: string;
    ref: string;
    status: "success" | string,
    web_url: string;
  };
  diff_refs: {
    base_sha: string;
    head_sha: string;
    start_sha: string;
  };
  work_in_progress: false;
  milestone: string;
  merge_when_pipeline_succeeds: boolean;
  merge_status: "can_be_merged" | any;
  sha: string;
  merge_commit_sha: string;
  user_notes_count: number;
  discussion_locked: boolean;
  should_remove_source_branch: boolean;
  force_remove_source_branch: boolean;
  web_url: string;
  time_stats: {
    time_estimate: number;
    total_time_spent: number;
    human_time_estimate: number;
    human_total_time_spent: number;
  };
  subscribed: boolean;
}

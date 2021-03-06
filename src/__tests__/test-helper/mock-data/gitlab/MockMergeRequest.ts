import {MergeRequest} from "@type/gitlab/MergeRequest";

export const MockMergeRequest: MergeRequest = {
  id: 54088,
  iid: 1333,
  project_id: 32,
  title: "test title",
  description: "test description",
  state: "opened",
  created_at: "2018-11-14T09:33:18.270Z",
  updated_at: "2018-11-14T11:01:57.279Z",
  target_branch: "develop",
  source_branch: "my-branch",
  upvotes: 0,
  downvotes: 0,
  author: {
    id: 70,
    name: "tester",
    username: "test user",
    state: "active",
    avatar_url: "https://www.gravatar.com/avatar/12345",
    web_url: "http://gitlab.com/errol.lin",
  },
  assignee: null,
  source_project_id: 123,
  target_project_id: 123,
  labels: [],
  work_in_progress: false,
  milestone: null,
  merge_when_pipeline_succeeds: false,
  merge_status: "can_be_merged",
  sha: "40439ca171f2a28f657f0cc01dd3d08dd101321c",
  merge_commit_sha: "18aae599763bb86710f7fd3b7bee38ee6e4d959e",
  user_notes_count: 4,
  discussion_locked: null,
  should_remove_source_branch: null,
  force_remove_source_branch: true,
  web_url: "http://gitlab.com/LT/V3Desktop/merge_requests/1333",
  time_stats: {
    time_estimate: 0,
    total_time_spent: 0,
    human_time_estimate: null,
    human_total_time_spent: null,
  },
  squash: false,
  subscribed: true,
  changes_count: "3",
  closed_by: null,
  closed_at: null,
  latest_build_started_at: "2018-11-14T09:31:46.054Z",
  latest_build_finished_at: "2018-11-14T09:33:22.216Z",
  first_deployed_to_production_at: null,
  pipeline: {
    id: 15221,
    sha: "40439ca171f2a28f657f0cc01dd3d08dd101321c",
    ref: "VWEB-1108",
    status: "success",
    web_url: "http://gitlab.com/LT/V3Desktop/pipelines/15221",
  },
  diff_refs: {
    base_sha: "dcbd43328e86d3292f0611f44aa80cd2c819afa4",
    head_sha: "40439ca171f2a28f657f0cc01dd3d08dd101321c",
    start_sha: "dcbd43328e86d3292f0611f44aa80cd2c819afa4",
  },
};

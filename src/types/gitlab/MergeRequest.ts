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
    assignee: string;
    source_project_id: number;
    target_project_id: number;
    labels: string[];
    work_in_progress: false;
    milestone: string;
    merge_when_pipeline_succeeds: boolean;
    merge_status: "can_be_merged" | any;
    sha: string;
    merge_commit_sha: string;
    user_notes_count: number;
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

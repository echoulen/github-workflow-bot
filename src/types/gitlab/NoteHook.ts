export interface NoteHook {
    object_kind: "note";
    user: {
        name: string;
        username: string;
        avatar_url: string;
    };
    project_id: number;
    project: {
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
        note: string;
        noteable_type: "MergeRequest" | any;
        author_id: number;
        created_at: string;
        updated_at: string;
        project_id: number;
        attachment: any;
        line_code: string;
        commit_id: string;
        noteable_id: number;
        system: boolean;
        st_diff: null;
        updated_by_id: number;
        type: "DiscussionNote" | "DiffNote" | null;
        position: string;
        original_position: string;
        resolved_at: string;
        resolved_by_id: number;
        discussion_id: string;
        change_position: string;
        resolved_by_push: string;
        url: string;
    };
    repository: {
        name: string;
        url: string;
        description: string;
        homepage: string;
    };
    "merge_request": {
        id: number;
        target_branch: string;
        source_branch: string;
        source_project_id: number;
        author_id: number;
        assignee_id: number;
        title: string;
        created_at: string;
        updated_at: string;
        milestone_id: string;
        state: "opened" | "closed",
        merge_status: "can_be_merged" | "cannot_be_merged",
        target_project_id: number;
        iid: number;
        description: string;
        updated_by_id: string;
        merge_error: any;
        merge_params: {
            force_remove_source_branch: string;
        };
        merge_when_pipeline_succeeds: boolean;
        merge_user_id: number;
        merge_commit_sha: string;
        deleted_at: string;
        in_progress_merge_commit_sha: string;
        lock_version: string;
        time_estimate: number;
        last_edited_at: string;
        last_edited_by_id: number;
        head_pipeline_id: number;
        ref_fetched: boolean;
        merge_jid: string;
        source: {
            name: string;
            description: string;
            web_url: string;
            avatar_url: null,
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
        human_total_time_spent: string;
        human_time_estimate: string;
    };
}

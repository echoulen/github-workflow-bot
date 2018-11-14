export interface Comment {
  id: number;
  body: string;
  attachment: any;
  author: {
    id: number;
    name: string;
    username: string;
    state: string;
    avatar_url: string;
    web_url: string;
  };
  created_at: string;
  updated_at: string;
  system: boolean;
  noteable_id: number;
  noteable_type: "MergeRequest" | any;
  noteable_iid: number;
  resolvable?: boolean;
}

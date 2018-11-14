import {Comment} from "@type/gitlab/Comment";

export const MockComments: Comment[] = [
  {
    id: 1001,
    body: "test comment",
    attachment: null,
    author: {
      id: 1,
      name: "tester",
      username: "test username",
      state: "active",
      avatar_url: "test avatar url",
      web_url: "http://gitlab/tester",
    },
    created_at: "2018-11-14T09:34:08.450Z",
    updated_at: "2018-11-14T09:34:08.450Z",
    system: false,
    noteable_id: 4247,
    noteable_type: "MergeRequest",
    resolvable: false,
    noteable_iid: 1333,
  },
  {
    id: 1002,
    body: "test comment",
    attachment: null,
    author: {
      id: 1,
      name: "tester",
      username: "test username",
      state: "active",
      avatar_url: "test avatar url",
      web_url: "http://gitlab/tester",
    },
    created_at: "2018-11-14T09:34:08.450Z",
    updated_at: "2018-11-14T09:34:08.450Z",
    system: false,
    noteable_id: 4247,
    noteable_type: "MergeRequest",
    resolvable: false,
    noteable_iid: 1333,
  },
];

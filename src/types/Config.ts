export interface Config {
integration: "github" | "gitlab"
  repository: {
    url: string;
    token: string;
  };
  notify: {
    enable: boolean;
    token: boolean;
  };
  lgtm: {
    enable: boolean;
    count: number;
  };
}

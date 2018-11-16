export interface Config {
  integration: "github" | "gitlab";
  repository: {
    url: string;
    token: string;
  };
  notify: {
    enable: boolean;
    token: string;
  };
  lgtm: {
    enable: boolean;
    count: number;
  };
}

import {Config} from "../types/Config";

export const config: Config = {
  integration: process.env.integration as any,
  repository: {
    url: process.env.repoUrl,
    token: process.env.token,
  },
  notify: {
    enable: process.env.enableNotify === "true",
    token: process.env.notifyToken,
  },
  lgtm: {
    enable: process.env.enableLGTM === "true",
    count: Number(process.env.lgtmCount),
  },
};

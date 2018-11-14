import {Config} from "@type/Config";

export class ConfigManager {
  public static getConfig(): Config {
    return {
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
  }
}

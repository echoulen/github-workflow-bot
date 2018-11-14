import "jest";

process.env.NODE_ENV = "test";
process.env.integration = "gitlab";
process.env.repoUrl = "http://gitlab.com";
process.env.token = "gitlab-test-token";
process.env.enableNotify = "true";
process.env.notifyToken = "telegram-test-token";
process.env.enableLGTM = "true";
process.env.lgtmCount = "2";

import {BeanTypes} from "@constants/BeanType";
import {TelegramNotify} from "@notifications/impl/TelegramNotify";
import {Notify} from "@notifications/Notify";
import {ApiExecutor} from "@repositories/api/ApiExecutor";
import {GitlabApiExecutor} from "@repositories/api/impl/GitlabApiExecutor";
import {GitlabWebhookImpl} from "@repositories/webhook/impl/GitlabWebhookImpl";
import {Webhook} from "@repositories/webhook/Webhook";
import {Container} from "inversify";

export const appContainer = new Container();
appContainer.bind<Webhook>(BeanTypes.WEBHOOK).to(GitlabWebhookImpl).inSingletonScope();
appContainer.bind<ApiExecutor>(BeanTypes.API_EXECUTOR).to(GitlabApiExecutor).inSingletonScope();
appContainer.bind<Notify>(BeanTypes.NOTIFY).to(TelegramNotify).inSingletonScope();

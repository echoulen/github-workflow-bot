import {ConfigManager} from "@config/ConfigManager";
import {NotifyService} from "@service/NotifyService";
import {WebhookService} from "@service/WebhookService";
import bodyParser from "body-parser";
import express from "express";

const port = process.env.PORT || 3000;

function startServer() {
  const webhookService = new WebhookService();

  const token = ConfigManager.getConfig().notify.token;
  const notifyService = new NotifyService(token);

  const app = express();
  app.use(bodyParser.json());

  app.use("/", async (req, res) => {
    const hook = req.body;
    const notification = await webhookService.process(hook);
    await notifyService.process(notification);
    res.end();
  });

  app.listen(port, () => console.log(`[BotEngine] Webhook is listening ${port}`));
}

startServer();

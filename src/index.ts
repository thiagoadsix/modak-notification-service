import "module-alias/register";

import { NotificationGateway } from "@/gateways/notification.gateway";
import { NotificationServiceImpl } from "@/services/notification-service.impl";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class AsyncNotificationServiceImpl extends NotificationServiceImpl {
  override async send(
    type: string,
    userId: string,
    message: string
  ): Promise<void> {
    await delay(Math.random() * 1000);
    return new Promise((resolve) => {
      super.send(type, userId, message);
      resolve();
    });
  }
}

const service = new AsyncNotificationServiceImpl(new NotificationGateway());

Promise.all([
  service.send("news", "dani@email.com", "news 1"),
  service.send("news", "dani@email.com", "news 2"),

  service.send("marketing", "madhu@email.com", "marketing 1"),
  service.send("marketing", "madhu@email.com", "marketing 2"),
  service.send("marketing", "madhu@email.com", "marketing 3"),
  service.send("marketing", "madhu@email.com", "marketing 4"),

  service.send("status", "juan@email.com", "status 1"),
  service.send("status", "juan@email.com", "status 2"),
  service.send("status", "juan@email.com", "status 3"),
]).then(() => {
  console.log("All notifications processed.");
});

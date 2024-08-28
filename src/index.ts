import "module-alias/register";

import { NotificationGateway } from "@/gateways/notification.gateway";
import { NotificationServiceImpl } from "@/services/notification-service.impl";

const service = new NotificationServiceImpl(new NotificationGateway());

service.send("news", "dani@email.com", "news 1");
service.send("news", "dani@email.com", "news 2");

service.send("marketing", "madhu@email.com", "marketing 1");
service.send("marketing", "madhu@email.com", "marketing 2");
service.send("marketing", "madhu@email.com", "marketing 3");
service.send("marketing", "madhu@email.com", "marketing 4");

service.send("status", "juan@email.com", "status 1");
service.send("status", "juan@email.com", "status 2");
service.send("status", "juan@email.com", "status 3");

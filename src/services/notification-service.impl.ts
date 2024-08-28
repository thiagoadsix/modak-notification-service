import { NotificationGateway } from "../gateways/notification.gateway";
import { MarketingRateLimitStrategy } from "../strategies/implementations/marketing-rate-limit.strategy";
import { NewsRateLimitStrategy } from "../strategies/implementations/news-rate-limit.strategy";
import { StatusRateLimitStrategy } from "../strategies/implementations/status-rate-limit.strategy";
import { RateLimitAbstract } from "../strategies/rate-limit.abstract";
import { NotificationService } from "./notification-service.interface";

export class NotificationServiceImpl implements NotificationService {
  private gateway: NotificationGateway;
  private strategies: { [key: string]: RateLimitAbstract };

  constructor(gateway: NotificationGateway) {
    this.gateway = gateway;
    this.strategies = {
      status: new StatusRateLimitStrategy(),
      news: new NewsRateLimitStrategy(),
      marketing: new MarketingRateLimitStrategy(),
    };
  }

  send(type: string, userId: string, message: string): void {
    const strategy = this.strategies[type];

    if (strategy && !strategy.isAllowed(userId)) {
      console.log(
        `Request rejected: Rate limit exceeded for ${type} for user ${userId}`
      );
      return;
    }

    this.gateway.send(userId, message);

    if (strategy) {
      strategy.logRequest(userId);
    }
  }
}

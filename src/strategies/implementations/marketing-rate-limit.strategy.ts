import { RateLimitAbstract } from "@/strategies/rate-limit.abstract";

export class MarketingRateLimitStrategy extends RateLimitAbstract {
  protected limit = 3;
  protected windowTime = 60 * 60 * 1000;
}

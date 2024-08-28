import { RateLimitAbstract } from "@/strategies/rate-limit.abstract";

export class StatusRateLimitStrategy extends RateLimitAbstract {
  protected limit = 2;
  protected windowTime = 60 * 1000;
}

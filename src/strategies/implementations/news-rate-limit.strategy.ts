import { RateLimitAbstract } from "@/strategies/rate-limit.abstract";

export class NewsRateLimitStrategy extends RateLimitAbstract {
  protected limit = 1;
  protected windowTime = 24 * 60 * 60 * 1000;
}

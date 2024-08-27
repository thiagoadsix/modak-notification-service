import { RateLimitAbstract } from "./rate-limit.abstract";

export class StatusRateLimitStrategy extends RateLimitAbstract {
  protected limit = 2;
  protected windowTime = 60 * 1000;
}

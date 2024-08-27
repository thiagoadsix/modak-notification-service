import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MarketingRateLimitStrategy } from "./marketing-rate-limit-strategy";

describe("marketing rate limit strategy", () => {
  let sut: MarketingRateLimitStrategy;

  beforeEach(() => {
    sut = new MarketingRateLimitStrategy();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should allow up to 3 requests within 1 hour", () => {
    expect(sut.isAllowed("user1")).toBe(true);
    sut.logRequest("user1");
    expect(sut.isAllowed("user1")).toBe(true);
    sut.logRequest("user1");
    expect(sut.isAllowed("user1")).toBe(true);

    sut.logRequest("user1");
    expect(sut.isAllowed("user1")).toBe(false);
  });

  it("should reset after 1 hour has passed", () => {
    sut.logRequest("user1");
    sut.logRequest("user1");
    sut.logRequest("user1");
    expect(sut.isAllowed("user1")).toBe(false);

    vi.advanceTimersByTime(60 * 60 * 1000 + 1000);
    expect(sut.isAllowed("user1")).toBe(true);
  });
});

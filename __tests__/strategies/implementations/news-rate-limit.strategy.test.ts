import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { NewsRateLimitStrategy } from "@/strategies/implementations/news-rate-limit.strategy";

describe("news rate limit strategy", () => {
  let sut: NewsRateLimitStrategy;

  beforeEach(() => {
    sut = new NewsRateLimitStrategy();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should allow 1 request per day", () => {
    expect(sut.isAllowed("user1")).toBe(true);
    sut.logRequest("user1");

    expect(sut.isAllowed("user1")).toBe(false);
  });

  it("should reset after 1 day has passed", () => {
    sut.logRequest("user1");
    expect(sut.isAllowed("user1")).toBe(false);

    vi.advanceTimersByTime(24 * 60 * 60 * 1000 + 1000);
    expect(sut.isAllowed("user1")).toBe(true);
  });
});

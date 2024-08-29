import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { StatusRateLimitStrategy } from "@/strategies/implementations/status-rate-limit.strategy";

describe("status rate limit strategy", () => {
  let sut: StatusRateLimitStrategy;

  beforeEach(() => {
    sut = new StatusRateLimitStrategy();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should allow up to 2 requests per minute", () => {
    sut.registerRequest("user1");
    expect(sut.isAllowed("user1")).toBe(true);

    sut.registerRequest("user1");
    expect(sut.isAllowed("user1")).toBe(true);

    sut.registerRequest("user1");
    expect(sut.isAllowed("user1")).toBe(false);
  });

  it("should reset after 1 minute has passed", () => {
    sut.registerRequest("user1");
    sut.registerRequest("user1");
    sut.registerRequest("user1");
    expect(sut.isAllowed("user1")).toBe(false);

    vi.advanceTimersByTime(61 * 1000);

    sut.registerRequest("user1");
    expect(sut.isAllowed("user1")).toBe(true);
  });
});

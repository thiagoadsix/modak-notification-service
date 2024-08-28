import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { RateLimitAbstract } from "@/strategies/rate-limit.abstract";

class MockRateLimitStrategy extends RateLimitAbstract {
  protected limit = 2;
  protected windowTime = 60 * 1000;
}

describe("rate limit abstract", () => {
  let sut: MockRateLimitStrategy;

  beforeEach(() => {
    sut = new MockRateLimitStrategy();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should allow requests under the limit", () => {
    expect(sut.isAllowed("user1")).toBe(true);
    sut.registerRequest("user1");

    expect(sut.isAllowed("user1")).toBe(true);
    sut.registerRequest("user1");

    expect(sut.isAllowed("user1")).toBe(false);
  });

  it("should reject requests over the limit", () => {
    sut.registerRequest("user1");
    sut.registerRequest("user1");

    expect(sut.isAllowed("user1")).toBe(false);
  });

  it("should reset limit after window time has passed", () => {
    vi.useFakeTimers();
    const initialTime = Date.now();
    vi.setSystemTime(initialTime);

    sut.registerRequest("user1");
    sut.registerRequest("user1");

    expect(sut.isAllowed("user1")).toBe(false);

    vi.advanceTimersByTime(30 * 1000);
    expect(sut.isAllowed("user1")).toBe(false);

    vi.advanceTimersByTime(31 * 1000);
    expect(sut.isAllowed("user1")).toBe(true);

    vi.useRealTimers();
  });

  it("should correctly handle multiple users", () => {
    sut.registerRequest("user1");
    sut.registerRequest("user2");
    expect(sut.isAllowed("user1")).toBe(true);
    expect(sut.isAllowed("user2")).toBe(true);

    sut.registerRequest("user1");
    sut.registerRequest("user2");
    expect(sut.isAllowed("user1")).toBe(false);
    expect(sut.isAllowed("user2")).toBe(false);
  });
});

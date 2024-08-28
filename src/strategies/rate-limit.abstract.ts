export abstract class RateLimitAbstract {
  protected requests: Map<string, number[]> = new Map();

  protected abstract limit: number;
  protected abstract windowTime: number;

  isAllowed(userId: string): boolean {
    const currentTime = Date.now();
    const timestamps = this.requests.get(userId) || [];
    const windowStart = currentTime - this.windowTime;
    const timestampsInsideLimitInterval = timestamps.filter(
      (time) => time > windowStart
    );

    return timestampsInsideLimitInterval.length < this.limit;
  }

  registerRequest(userId: string): void {
    const currentTime = Date.now();

    if (!this.requests.has(userId)) {
      this.requests.set(userId, []);
    }

    this.requests.get(userId)?.push(currentTime);
  }
}

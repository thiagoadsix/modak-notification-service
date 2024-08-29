export abstract class RateLimitAbstract {
  protected requests: Map<string, number[]> = new Map();

  protected abstract limit: number;
  protected abstract windowTime: number;

  isAllowed(userId: string): boolean {
    const timestamps = this.requests.get(userId) || [];
    this.cleanOldRequests(userId, timestamps);

    return timestamps.length <= this.limit;
  }

  registerRequest(userId: string): void {
    const currentTime = Date.now();

    if (!this.requests.has(userId)) {
      this.requests.set(userId, []);
    }

    this.requests.get(userId)?.push(currentTime);
  }

  private cleanOldRequests(userId: string, timestamps: number[]): void {
    if (timestamps.length === 0) return;

    const windowStart = timestamps[timestamps.length - 1] - this.windowTime;

    const filteredTimestamps = timestamps.filter((time) => time >= windowStart);
    this.requests.set(userId, filteredTimestamps);
  }
}

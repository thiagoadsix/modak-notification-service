export abstract class RateLimitAbstract {
  protected requests: Map<string, number[]> = new Map();

  protected abstract limit: number;
  protected abstract windowTime: number;

  isAllowed(userId: string): boolean {
    const timestamps = this.requests.get(userId) || [];
    const requestsUpdated = this.cleanOldRequests(userId, timestamps);
    return requestsUpdated.length <= this.limit;
  }

  registerRequest(userId: string): void {
    const currentTime = Date.now();

    if (!this.requests.has(userId)) {
      this.requests.set(userId, []);
    }

    const timestamps = this.requests.get(userId);
    timestamps?.push(currentTime);
  }

  private cleanOldRequests(userId: string, timestamps: number[]): number[] {
    if (timestamps.length === 0) return [];

    const lastTimestamp = timestamps[timestamps.length - 1];
    const windowStart = lastTimestamp - this.windowTime;

    const filteredTimestamps = timestamps.filter((time) => time >= windowStart);

    this.requests.set(userId, filteredTimestamps);

    return filteredTimestamps;
  }
}

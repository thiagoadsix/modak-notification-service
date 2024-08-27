export abstract class RateLimitAbstract {
  protected requests: Map<string, number[]> = new Map();

  protected abstract limit: number;
  protected abstract windowTime: number;

  isAllowed(userId: string): boolean {
    const currentTime = Date.now();
    const timestamps = this.requests.get(userId) || [];

    this.cleanOldRequests(timestamps, currentTime);

    return timestamps.length < this.limit;
  }

  logRequest(userId: string): void {
    const currentTime = Date.now();

    if (!this.requests.has(userId)) {
      this.requests.set(userId, []);
    }

    this.requests.get(userId)?.push(currentTime);
  }

  private cleanOldRequests(timestamps: number[], currentTime: number): void {
    const windowStart = currentTime - this.windowTime;

    while (timestamps.length > 0 && timestamps[0] < windowStart) {
      timestamps.shift();
    }
  }
}

export class RateLimitError extends Error {
  constructor(
    public remaining_soft: number,
    public remaining_hard: number,
    public retryAfter?: number,
    public error?: string,
  ) {
    super('Rate limit exceeded');
    this.name = 'RateLimitError';
  }
}

export class RateLimitError extends Error {
  constructor(
    public success: boolean,
    public remaining: number,
  ) {
    super('Rate limit exceeded');
    this.name = 'RateLimitError';
  }
}

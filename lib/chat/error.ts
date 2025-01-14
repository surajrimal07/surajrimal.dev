export class RateLimitError extends Error {
  constructor(
    public remaining: number,
    public error?: string,
  ) {
    super('Rate limit exceeded');
    this.name = 'RateLimitError';
  }
}

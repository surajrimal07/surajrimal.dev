export type ShareType = 'twittershare' | 'facebookshare' | 'clipboardshare';

export interface BlogShares {
  twittershare: number;
  facebookshare: number;
  clipboardshare: number;
  total: number;
}

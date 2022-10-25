export enum TokenExpiration {
  Access = 60 * 60 * 5, // 5 minutes
  Refresh = 60 * 60 * 24 * 7, // 7 Days,
  RefreshIfLessThan = 60 * 60 * 24 * 4 // 4 Days
}
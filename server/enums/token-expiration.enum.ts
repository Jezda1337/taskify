export enum TokenExpiration {
  Access = 60 * 5, // 5 minutes
  Refresh = 60 * 60 * 24 * 30, // 30 Days,
  RefreshIfLessThan = 60 * 60 * 24 * 20 // 20 Days
}
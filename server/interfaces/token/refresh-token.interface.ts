import { RefreshTokenPayload } from "./refresh-token-payload.interface";

export interface RefreshToken extends RefreshTokenPayload {
  exp: number;
}
import { AccessTokenPayload } from "./access-token-payload.interface";

export interface AccessToken extends AccessTokenPayload {
  exp: number;
}
import { Cookies } from "server/enums/cookies.enum";
import { TokenExpiration } from "server/enums/token-expiration.enum";
import { CookieOptions } from "express";
import { AccessTokenPayload } from "server/interfaces/token/access-token-payload.interface";
import { AccessToken } from "server/interfaces/token/access-token.interface";
import { RefreshTokenPayload } from "server/interfaces/token/refresh-token-payload.interface";
import { RefreshToken } from "server/interfaces/token/refresh-token.interface";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie, deleteCookie } from 'cookies-next';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;


function signAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, accessTokenSecret, { expiresIn: TokenExpiration.Access });
}
function signRefreshToken(payload: RefreshTokenPayload) {
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: TokenExpiration.Refresh });
}

export function buildTokens(user: { _id: string, fullname: string, tokenVersion: number }) {
  const accessPayload: AccessTokenPayload = { userId: user._id };
  const refreshPayload: RefreshTokenPayload = { userId: user._id!, version: user.tokenVersion! };

  const accessToken = signAccessToken(accessPayload);
  const refreshToken = refreshPayload && signRefreshToken(refreshPayload);

  return { accessToken, refreshToken };
}

const isProduction = process.env.NODE_ENV === "production";
const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "strict" : "lax",
  domain: process.env.BASE_DOMAIN,
  path: "/",
  maxAge: TokenExpiration.Access * 1000,
};

export function setTokens(req: NextApiRequest, res: NextApiResponse, accessToken: string, refreshToken?: string) {
  setCookie(Cookies.AccessToken, accessToken, { req, res, ...cookieOptions });

  if (refreshToken) {
    setCookie(Cookies.RefreshToken, refreshToken, { req, res, ...cookieOptions });
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, refreshTokenSecret) as RefreshToken;
  } catch (error) {
    console.log('verifyRefreshToken error: ', error);
  }
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, accessTokenSecret) as AccessToken;
  } catch (error) {
    console.log('verifyAccessToken error: ', error);
  }
}

export function refreshTokens(currentRefreshToken: RefreshToken, tokenVersion: number) {
  if (currentRefreshToken.version !== tokenVersion) {
    throw new Error("Refresh token is invalid");
  }

  const { userId } = currentRefreshToken;
  const accessPayload: AccessTokenPayload = { userId };
  const accessToken = signAccessToken(accessPayload);

  let refreshPayload: RefreshTokenPayload | undefined;
  const expiration = new Date(currentRefreshToken.exp * 1000);
  const now = new Date();
  const secondsUntilExpiration = Math.floor((expiration.getTime() - now.getTime()) / 1000);
  if (secondsUntilExpiration < TokenExpiration.RefreshIfLessThan) {
    refreshPayload = { userId, version: tokenVersion };
  }
  const refreshToken = refreshPayload && signRefreshToken(refreshPayload);

  return { accessToken, refreshToken };
}

export function clearTokens(req: NextApiRequest, res: NextApiResponse) {
  deleteCookie(Cookies.AccessToken, { req, res });
  deleteCookie(Cookies.RefreshToken, { req, res });
}

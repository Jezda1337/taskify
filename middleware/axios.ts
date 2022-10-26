import axios from "axios";
import { IncomingMessage } from "http";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// CLIENT
export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  res => res,
  async err => {
    const originalResponse = err.config;
    if (err.response?.status === 401 && !originalResponse.sent) {
      originalResponse.sent = true;
      try {
        await refreshClient();
        return axiosClient.request(originalResponse)
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

const refreshClient = async () => {
  return await axios.get(`${baseURL}/auth/refresh`, { withCredentials: true })
}

// SSR
export const axiosSSR = axios.create({
  baseURL,
  withCredentials: true,
});

axiosSSR.interceptors.response.use(
  res => res,
  async err => {
    const originalResponse = err.config;
    if (err.response?.status === 401 && !originalResponse.sent) {
      originalResponse.sent = true;
      try {
        const refreshedResponse = await refreshSSR(originalResponse);
        originalResponse.headers.cookie = refreshedResponse.headers['set-cookie'];
        return axiosSSR.request(originalResponse)
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

const refreshSSR = async (originalResponse: IncomingMessage) => {
  return await axios.get(`${baseURL}/auth/refresh`, { headers: { cookie: originalResponse.headers.cookie! } })
}

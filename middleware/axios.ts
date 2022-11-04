import axios from "axios";
import {AxiosError} from 'axios'
const baseURL = process.env.NEXT_PUBLIC_API_URL;

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

export const getError = (error: AxiosError) => {
  if (error.isAxiosError && error.response) return error.response.data
  return 'Unexpected error'
}
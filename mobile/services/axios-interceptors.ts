import { getClerkInstance } from "@clerk/clerk-expo";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const getSessionToken = async (): Promise<string> => {
  const token = (await getClerkInstance()?.session?.getToken()) || "";
  return token;
};

/**
 * Adds the session token to the Authorization header.
 *
 */
const addLoginHeaders = async (config: InternalAxiosRequestConfig<any>) => {
  // Retrieve the session token
  const token = await getSessionToken();
  if (token && token.length > 0 && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    if (config.headers) {
      // Remove Authorization header if no token is available
      delete config.headers["Authorization"];
    }
  }
  return config;
};

/**
 * Creates an Axios instance with optional interceptors.
 *
 */
const createAxiosInstance = (
  baseUrl: string,
  interceptors = true
): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${baseUrl}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  if (interceptors) {
    // Add request interceptor
    instance.interceptors.request.use(addLoginHeaders, (error) =>
      Promise.reject(error)
    );

    // Add response interceptor
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response) {
          const { status } = error.response;
          if (status === 401) {
            console.warn("Unauthorized request. Please check your session.");
            // Handle unauthorized access (e.g., redirect to login)
          }
        }
        return Promise.reject(error);
      }
    );
  }

  return instance;
};

// Create a base Axios instance with the default base URL
const baseAxios = createAxiosInstance(
  process.env.EXPO_PUBLIC_SERVER_BASE_URL! + "/api/v1"
);

export { baseAxios };

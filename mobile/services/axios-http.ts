import { AxiosInstance, AxiosRequestConfig } from "axios";

//custom imports

export interface HTTPFnParams {
  url: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  params?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, any>;
  formData?: FormData;
}

const getHttpService = (axios: AxiosInstance) => {
  const createConfig = (params: HTTPFnParams): AxiosRequestConfig => {
    const url = params.url;
    const config: AxiosRequestConfig = {
      url,
      method: params.method || "get",
      params: params.params,
      headers: params.headers,
      data: params?.data || params?.formData,
    };
    return config;
  };

  const request = async (params: HTTPFnParams) => {
    const config = createConfig(params);
    try {
      const response = await axios.request(config);
      return response?.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    get: (params: HTTPFnParams) => request({ ...params, method: "get" }),
    post: (params: HTTPFnParams) => request({ ...params, method: "post" }),
    put: (params: HTTPFnParams) => request({ ...params, method: "put" }),
    patch: (params: HTTPFnParams) => request({ ...params, method: "patch" }),
    delete: (params: HTTPFnParams) => request({ ...params, method: "delete" }),
    upload: (params: HTTPFnParams) => request({ ...params, method: "post" }),
  };
};

export { getHttpService };

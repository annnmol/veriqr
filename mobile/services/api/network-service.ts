import { AxiosResponse } from "axios";

//custom imports
import { baseAxios } from "../axios-interceptors";
import { getHttpService } from "../axios-http";

const httpService = getHttpService(baseAxios);

// Define endpoint paths as immutable constants
const ENDPOINTS = {
  USERS: "/users",
} as const;

class NetworkService {
  static githubUserById = (
    data: Record<string, any> = {},
    headers: Record<string, any> = {}
  ): Promise<AxiosResponse<any>> => {
    const { id } = data;
    if (!id) {
      throw new Error("User ID is required");
    }
    const url = `${ENDPOINTS.USERS}/${id}`;
    return httpService.get({
      url: url,
      headers,
      // params: data,
    });
  };
}

export default NetworkService;

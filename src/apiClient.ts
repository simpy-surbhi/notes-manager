import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Config } from "@/config/Config";
import store from "./store";
import router from "@/router";
type AxiosJSONResponse<T> = AxiosResponse & {
  data: {
    data: T;
  };
};

class APIClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create();
    this.api.interceptors.response.use(
      (response) => {
        if (response.status === 401) {
          store.dispatch("logout").then(() => {
            router.push("/login");
          });
        }
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          store.dispatch("logout").then(() => {
            router.push("/login");
          });
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(
    path: string,
    queryStringData?: { [key: string]: string | number }
  ) {
    await this.setHeaders("GET");

    const url = `${path}.json${this.objectToUrlParams(queryStringData)}`;
    const response = await this.api.get<AxiosJSONResponse<T>>(
      `${Config.API_BASE_URL}${url}`
    );
    return this.getResponse(response);
  }

  public async post<U, T>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ) {
    await this.setHeaders("POST");
    const response = await this.api.post<AxiosJSONResponse<T>>(
      `${Config.API_BASE_URL}${path}`,
      data,
      config
    );
    return this.getResponse(response);
  }

  public async login<U, T>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ) {
    await this.setHeaders("POST");
    await this.setLoginHeaders();
    const response = await this.api.post(
      `${Config.API_BASE_URL}${path}`,
      data,
      config
    );
    return response.data.token;
  }

  public async put<U, T>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ) {
    await this.setHeaders("PUT");

    const response = await this.api.put<AxiosJSONResponse<T>>(
      `${Config.API_BASE_URL}${path}`,
      data,
      config
    );
    return this.getResponse(response);
  }

  public async delete<T>(path: string) {
    await this.setHeaders("DELETE");

    const response = await this.api.delete<AxiosJSONResponse<T>>(
      `${Config.API_BASE_URL}${path}`
    );
    return this.getResponse(response);
  }

  private getResponse<T>(response: AxiosResponse<AxiosJSONResponse<T>>) {
    if (response.status === 201 || response.status === 204) {
      return response.data;
    }
    if (!response.data) {
      throw new Error(response.data);
    }

    return response.data;
  }

  private async setHeaders(method: "GET" | "POST" | "PUT" | "DELETE") {
    const token = await this.getToken();

    const headers: any = {};

    if (["GET", "POST", "PUT"].includes(method)) {
      headers.Accept = "application/json";
    }

    if (token) {
      headers.Authorization = "Bearer " + token;
    }

    this.api.defaults.headers = headers;
  }

  private async setLoginHeaders() {
    const headers: any = {};
    headers.Accept = "application/json";
    headers["Content-Type"] = "application/json";
    this.api.defaults.headers = headers;
  }

  private async getToken() {
    return store.state.token;
  }

  private objectToUrlParams(object?: { [key: string]: any }) {
    if (!object) {
      return new URLSearchParams();
    }

    const queryString = Object.entries(object).reduce<URLSearchParams>(
      (prev, [key, val]) => {
        if (typeof val !== "undefined" && val !== null) {
          prev.append(key, String(val));
        }

        return prev;
      },
      new URLSearchParams()
    );

    return queryString.toString().length > 0 ? `?${queryString}` : "";
  }
}
export const ApiClient = new APIClient();

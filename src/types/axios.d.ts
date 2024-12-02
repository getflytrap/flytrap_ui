import { InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  export interface InternalAxiosRequestConfig<T = any> {
    retry?: boolean;
    skipRefresh?: boolean;
  }
}

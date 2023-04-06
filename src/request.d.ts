import { AxiosRequestConfig } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    /**
     * @description 是否直接取出{success:false,data} 中的data
     */
    getAllData?: boolean;
  }
}

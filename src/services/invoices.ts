import request from "@/utils/request";

export function getData(params: any) {
  return request.get("/api/test", { params: params });
}

export function getData2(params: any) {
  return request.post("/api/test2", params);
}

export function getError() {
  return request.get("/api/test3");
}

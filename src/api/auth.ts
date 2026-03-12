import axiosInstance from "./axiosInterceptor";

// LOGIN API
export const loginApi = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};
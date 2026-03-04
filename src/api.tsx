import axiosInstance from "../src/lib/axiosInterceptor";

// 🔐 LOGIN API
export const loginApi = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

// 📞 GET CALL LOGS API
export const getCallLogs = async (page: number = 1, page_size: number = 10) => {
  const response = await axiosInstance.get(
    `/call-logs?page=${page}&page_size=${page_size}`,
  );
  return response.data;
};

// 📊 GET DASHBOARD STATS
export const getDashboardStats = async () => {
  const response = await axiosInstance.get("/dashboard/metrics/stats");
  return response.data;
};

// 🏆 GET TOP AGENTS
export const getTopAgents = async () => {
  const response = await axiosInstance.get("/dashboard/metrics/top-agents");
  return response.data;
};

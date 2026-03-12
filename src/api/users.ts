import axiosInstance from "./axiosInterceptor";

// Onboard User API
export const onboardUser = async (userData: any) => {
    const response = await axiosInstance.post("/admin/users/onboard", userData);
    return response.data;
};

// Get All Users
export const allUsers = async () => {
    const response = await axiosInstance.get("/admin/users/");
    return response.data;
};

// Get all detail for user
export const userDetail = async (user_id: string) => {
    const response = await axiosInstance.get(`admin/users/${user_id}`)
    return response.data;
}
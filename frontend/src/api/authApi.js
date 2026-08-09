import axiosClient from "./axiosClient";

const authApi = {
  register: async (registrationData) => {
    const response = await axiosClient.post(
      "/api/v1/auth/register",
      registrationData
    );

    return response.data;
  },

  login: async (loginData) => {
    const response = await axiosClient.post(
      "/api/v1/auth/login",
      loginData
    );

    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axiosClient.get("/api/v1/users/me");

    return response.data;
  },
};

export default authApi;
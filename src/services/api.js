import axios from "axios";
import { BASE_URL } from "../utils/constants";
// Auth API Functions
export const signup = async (userData) => {
  try {
    console.log(BASE_URL);
    const response = await axios.post(`${BASE_URL}/signup`, userData, {
      withCredentials: true,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error signing up");
  }
};

export const signin = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials, {
      withCredentials: true,
    });
    localStorage.setItem("token", response.data.token);
    console.log("Login Response:", response);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response || error);
    throw new Error(error.response?.data?.message || "Error signing in");
  }
};

export const logout = async () => {
  try {
    await axios.post(`${BASE_URL}/logout`, { withCredentials: true });
    return { message: "Logged out successfully" };
  } catch (error) {
    throw new Error("Error logging out");
  }
};

// Services API Functions
export const fetchServices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/services`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching services");
  }
};

export const createService = async (serviceData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/services`, serviceData, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating service");
  }
};

export const updateService = async (serviceId, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${BASE_URL}/services/${serviceId}`,
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating service");
  }
};

export const deleteService = async (serviceId) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await axios.delete(`${BASE_URL}/services/${serviceId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error response:", error.response || error);
    throw new Error(error.response?.data?.message || "Error deleting service");
  }
};

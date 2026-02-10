import axios from "axios";
import type { User } from "../types/user.ts";
import { useAuthStore } from "../libs/store/authStore.ts";

export interface registerUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface registerUserResponse {
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface loginUserRequest {
  email: string;
  password: string;
}

export interface loginUserResponse {
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

const api = axios.create({
  baseURL: "https://readjourney.b.goit.study/api",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const registerUser = async (data: registerUserRequest) => {
  try {
    const response = await api.post<registerUserResponse>(
      "/users/signup",
      data
    );
    return response.data;
  } catch {
    throw new Error("Register failed");
  }
};

export const loginUser = async (data: loginUserRequest) => {
  try {
    const response = await api.post<loginUserResponse>("/users/signin", data);
    return response.data;
  } catch {
    throw new Error("Login failed");
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    const response = await api.post("/users/signout");
    return response.data;
  } catch {
    throw new Error("Logout failed");
  }
};

export const currentUser = async () => {
  try {
    const response = await api.get<User>("/users/current");
    return response.data;
  } catch {
    throw new Error("Failed to load current user");
  }
};

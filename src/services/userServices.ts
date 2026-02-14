import axios from "axios";
import type { User } from "../types/user.ts";
import { useAuthStore } from "../libs/store/authStore.ts";
import type { Book } from "../types/books.ts";

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

export interface fetchAllBooksRequest {
  page: number;
  limit: number;
}

export interface fetchAllBooksResponse {
  results: Book[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface fetchOwnBooksResponse {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status: "in-progress" | "done" | "unread";
  owner: string;
  progress: [
    {
      startPage: number;
      startReading: string;
      finishPage: number;
      finishReading: string;
      speed: number;
      status: string;
    },
  ];
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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;

        const { data } = await axios.get(
          "https://readjourney.b.goit.study/api/users/current/refresh",
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        useAuthStore.getState().setAuth(data);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

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

export const refreshUser = async () => {
  try {
    const response = await api.get("/users/current/refresh");
    return response.data;
  } catch {
    throw new Error("Failed to refresh user");
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

export const fetchAllBooks = async ({ page, limit }: fetchAllBooksRequest) => {
  try {
    const response = await api.get<fetchAllBooksResponse>("/books/recommend", {
      params: { page, limit },
    });
    return response.data;
  } catch {
    throw new Error("Failed to fetch recommended books");
  }
};

export const fetchBookById = async (id: string) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to fetch book");
  }
};

export const addToLibraryBook = async (id: string) => {
  try {
    const response = api.post(`/books/add/${id}`);
    return (await response).data;
  } catch {
    throw new Error("Failed add book to library");
  }
};

export const fetchOwnBooks = async () => {
  try {
    const response = await api.get<fetchOwnBooksResponse[]>("/books/own");
    return response.data;
  } catch {
    throw new Error("Failed to fetch your books");
  }
};

export const removeBookFromLibrary = async (id: string) => {
  try {
    const response = await api.delete(`/books/remove/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to remove book from library");
  }
};

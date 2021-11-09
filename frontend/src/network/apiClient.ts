import { CreateUserDto, User } from "@/types/user";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_BASE_URL,
});

export default {
  getUsers: async (): Promise<User[]> => {
    const { data } = await apiClient.get<User[]>("/user");

    return data;
  },

  createUser: async (user: CreateUserDto): Promise<User> => {
    const { data } = await apiClient.post<User>("/user", user);

    return data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/user/${id}`);
  },
};

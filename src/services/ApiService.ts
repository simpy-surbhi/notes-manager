import { ApiClient } from "@/apiClient";
import Note from "@/models/Note";

class ApiService {
  login(userName: string, password: string): Promise<any> {
    return ApiClient.login(`/users/login`, {
      email: userName,
      password: password,
    });
  }

  getNotes(data: { [key: string]: string | number }): Promise<any> {
    return ApiClient.get<Note[]>(`/notes`, data);
  }

  addNotes(data: any): Promise<any> {
    return ApiClient.post(`/notes`, data);
  }

  updateNote(id: any, data: any): Promise<any> {
    return ApiClient.put(`/notes/${id}`, data);
  }

  deleteNote(id: any): Promise<any> {
    return ApiClient.delete(`/notes/${id}`);
  }
}

export default new ApiService();

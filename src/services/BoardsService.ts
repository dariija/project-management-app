import { AxiosResponse } from 'axios';
import { Board } from '../types/types';
import { API } from '../utils/API';

export default class BoardService {
  static getAllBoards(): Promise<AxiosResponse<[] | Board[]>> {
    return API.get<[] | Board[]>('/boards');
  }

  //   static getBoardById(id: string) {
  //       return API.get(`/boards/${id}`)
  //   }

  static createBoard(title: string, description: string): Promise<AxiosResponse<Board>> {
    return API.post<Board>('/boards', { title, description });
  }

  static updateBoard(
    id: string,
    title: string,
    description: string
  ): Promise<AxiosResponse<Board>> {
    return API.put<Board>(`/boards/${id}`, { title, description });
  }

  static deleteBoard(id: string) {
    return API.delete(`/boards/${id}`);
  }
}

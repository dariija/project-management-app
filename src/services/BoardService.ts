import { AxiosResponse } from 'axios';
import { Column, ColumnFullData, ColumnInfo, Task, TaskFullData, TaskInfo } from '../types/types';
import { API } from '../utils/API';

export default class BoardService {
  static getAllColumns(boardId: string): Promise<AxiosResponse<[] | Column[]>> {
    return API.get<[] | Column[]>(`/boards/${boardId}/columns`);
  }

  static getColumnById(boardId: string, columnId: string): Promise<AxiosResponse<ColumnFullData>> {
    return API.get<ColumnFullData>(`/boards/${boardId}/columns/${columnId}`);
  }

  static createColumn(boardId: string, { title }: ColumnInfo): Promise<AxiosResponse<Column>> {
    return API.post<Column>(`/boards/${boardId}/columns`, { title });
  }

  static updateColumn(
    boardId: string,
    { id, title, order }: Column
  ): Promise<AxiosResponse<Column>> {
    return API.put<Column>(`/boards/${boardId}/columns/${id}`, { title, order });
  }

  static deleteColumn(boardId: string, columnId: string) {
    return API.delete(`/boards/${boardId}/columns/${columnId}`);
  }

  static getAllColumnTasks(
    boardId: string,
    columnId: string
  ): Promise<AxiosResponse<[] | TaskFullData[]>> {
    return API.get<[] | TaskFullData[]>(`/boards/${boardId}/columns/${columnId}/tasks`);
  }

  static getColumnTaskById(
    boardId: string,
    columnId: string,
    taskId: string
  ): Promise<AxiosResponse<TaskFullData>> {
    return API.get<TaskFullData>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  static createColumnTask({
    boardId,
    columnId,
    ...taskInfo
  }: TaskInfo): Promise<AxiosResponse<Task>> {
    return API.post<Task>(`/boards/${boardId}/columns/${columnId}/tasks`, { ...taskInfo });
  }

  static updateColumnTask({
    boardId,
    columnId,
    id,
    ...taskInfo
  }: Task): Promise<AxiosResponse<Task>> {
    return API.put<Task>(`/boards/${boardId}/columns/${columnId}/tasks/${id}`, {
      ...taskInfo,
      boardId,
      columnId,
    });
  }

  static deleteColumnTask(boardId: string, columnId: string, taskId: string) {
    return API.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }
}

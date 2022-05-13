import { AxiosResponse } from 'axios';
import { User, UserToken } from '../types/types';
import { API } from '../utils/API';

export default class AuthService {
  static signup(name: string, login: string, password: string): Promise<AxiosResponse<User>> {
    return API.post<User>('/signup', { name, login, password });
  }

  static signin(login: string, password: string): Promise<AxiosResponse<UserToken>> {
    return API.post<UserToken>('/signin', { login, password });
  }

  static signout() {
    localStorage.removeItem('token');
  }
}

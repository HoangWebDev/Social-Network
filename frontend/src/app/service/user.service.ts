import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.URL}/users`);
  }

  getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.URL}/users/` + id);
  }

  getUserProfile(): Observable<UserModel> {
    // Lấy token từ localStorage
    const token = sessionStorage.getItem('token');

    // Kiểm tra nếu token tồn tại
    if (token) {
      // Tạo HttpHeaders và thêm token vào Authorization header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<UserModel>(`${this.URL}/users/profile`, { headers: headers });
    } else {
      // Xử lý trường hợp không có token, này: điều hướng người dùng về trang đăng nhập
      throw new Error('Token not found');
    }
  }
}

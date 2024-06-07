import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { PostsModel } from '../models/posts.model';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /* Các phường thức khác */
  getPosts(): Observable<PostsModel[]> {
    // Lấy token từ sessionStorage
    const token = localStorage.getItem('token');
    // Kiểm tra nếu token tồn tại
    if (token) {
      // Tạo HttpHeaders và thêm token vào Authorization header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // Return an Observable of PostsModel[] using HttpClient with headers
      return this.http.get<PostsModel[]>(`${this.URL}/posts`, { headers: headers });
    } else {
      // Xử lý trường hợp không có token, ví dụ: thông báo lỗi hoặc điều hướng người dùng
      throw new Error('Token not found');
    }
  }

  getPostsById(id_posts: number): Observable<PostsModel> {
    return this.http.get<PostsModel>(`${this.URL}/posts/${id_posts}`);
  }

  getPostsByIdUser(id_user: number): Observable<PostsModel[]> {
    return this.http.get<PostsModel[]>(`${this.URL}/posts/user/${id_user}`);
  }

  addPosts(post: PostsModel): Observable<PostsModel> {
    return this.http.post<PostsModel>(`${this.URL}/posts`, post);
  }

  updatePosts(id_posts: number, post: PostsModel): Observable<PostsModel> {
    return this.http.put<PostsModel>(`${this.URL}/posts/${id_posts}`, post);
  }

  deletePosts(id_posts: number): Observable<PostsModel> {
    return this.http.delete<PostsModel>(`${this.URL}/posts/${id_posts}`);
  }
}

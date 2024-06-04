import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentModel } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getCommentsByPostId(id_posts: number): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${this.URL}/comments/${id_posts}`);
  }

  addComment(comment: CommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>(`${this.URL}/comments`, comment);
  }

  updateComment(id_comment: number, comment: CommentModel): Observable<CommentModel> {
    return this.http.put<CommentModel>(`${this.URL}/comments/${id_comment}`, comment);
  }

  deleteComment(id_comment: number): Observable<any> {
    return this.http.delete(`${this.URL}/comments/${id_comment}`);
  }
}

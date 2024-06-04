import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { LikeModel } from '../models/like.model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getLikes(): Observable<LikeModel[]> {
    return this.http.get<LikeModel[]>(`${this.URL}/likes`);
  }

  getLikePosts(id_posts: number): Observable<LikeModel[]> {
    return this.http.get<LikeModel[]>(`${this.URL}/likes/` + id_posts);
  }

  likePosts(id_posts: number, id_user: number): Observable<LikeModel> {
    return this.http.post<LikeModel>(`${this.URL}/likes`, { id_posts, id_user });
  }

  unlikePosts(id_posts: number, id_user: number): Observable<LikeModel> {
    return this.http.delete<LikeModel>(`${this.URL}/likes/` + id_user + '/' + id_posts);
  }
}

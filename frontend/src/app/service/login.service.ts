import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(`${this.URL}/users/login`, { username, password });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  register(full_name: string, email: string, username: string, password: string) {
    return this.http.post(`${this.URL}/users`, { full_name, email, username, password });
  }

}

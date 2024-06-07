import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  users: UserModel | null = null;

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) { }

  get username() {
    return this.loginForm.controls['username'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username && password) {
        this.loginService.login(username, password).subscribe({
          next: (response: any) => {
            console.log(response);

            localStorage.setItem('token', response.token); // Lưu token vào sessionStorage
            alert("Đăng nhập thanh cong!");
            this.router.navigate(['/posts']); // Điều hướng người dùng về trang chính                    
          },
          error: (err) => {
            alert("Đăng nhập thất bại!");
            window.location.reload()
          }
        });
      }
    }
  }
}

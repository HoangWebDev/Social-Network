import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { UserService } from '../../service/user.service';
import { RegisterService } from '../../service/register.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    full_name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    confirm_password: ['', [Validators.required]],
  }, {
    validators: this.comfirmPassword('password', 'confirm_password')
  }
  )

  comfirmPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['passwordsMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordsMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private userService: UserService,
    private router: Router
  ) { }

  get full_name() {
    return this.registerForm.controls['full_name'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get phone() {
    return this.registerForm.controls['phone'];
  }

  get username() {
    return this.registerForm.controls['username'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirm_password() {
    return this.registerForm.controls['confirm_password'];
  }

  onSubmit() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.confirm_password) {
        alert("Password do not match");
        return;
      } else {
        const { full_name, email, username, password } = this.registerForm.value;
        this.registerService.register(full_name, email, username, password).subscribe({
          next: (response: any) => {
            alert("Đăng ki thanh cong!");
            this.router.navigate(['/login']);
          },
          error: (error) => {
            alert("Đăng ki that bai!");
          }
        })
      }
    }
  }
}

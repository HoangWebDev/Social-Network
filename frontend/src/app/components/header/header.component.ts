import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserModel } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  userProfile: UserModel | null = null;

  constructor(private userService: UserService) { }

  logout() {
    sessionStorage.removeItem('token');
    location.reload()
  }

  //Lấy thông tin userprofile
  getUserProfile() {
    this.userService.getUserProfile().subscribe({
      next: (user) => this.userProfile = user,
      error: (error) => console.error('Failed to get user profile', error)
    });
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  showMenu() {
    const menu = document.querySelector('.menu_acount');
    menu?.classList.toggle('active');
  }

}

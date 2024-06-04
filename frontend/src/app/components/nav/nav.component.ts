import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserModel } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  activeMenu: string = 'feed'; // Giả sử 'feed' là mặc định khi tải trang

  userProfile: UserModel | null = null;

  constructor(private userService: UserService) { }

  setActive(menuItem: string) {
    this.activeMenu = menuItem;
  }

  //Lấy thông ti userprofile
  getUserProfile() {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.userProfile = user;
      },
      error: (error) => {
        console.error('Failed to get user profile', error);
      }
    });
  }

  ngOnInit(): void {
    this.getUserProfile()
  }

}

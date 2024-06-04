import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserModel } from '../../models/user.model';
import { CommentModel } from '../../models/comment';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../contact/contact.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, NavComponent, ContactComponent, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  userProfile: UserModel | null = null;

  constructor(private userService: UserService) { }

  //Lấy thông tin userprofile
  getUserProfile() {
    this.userService.getUserProfile().subscribe({
      next: (user) => this.userProfile = user,
      error: (error) => console.error('Get user profile thất bại', error)
    });
  }

}

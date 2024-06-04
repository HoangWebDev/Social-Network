import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  users: UserModel[] = []
  userProfile: UserModel | null = null;

  constructor(private userService: UserService) { }
  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        if (this.userProfile) {
          this.users = users.filter((user) => user.id_user !== this.userProfile!.id_user)
        }
        this.users = users;
      },
      error: (error) => {
        console.error('Failed to get users', error);
      }
    });
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

  ngOnInit() {
    this.getUsers();
  }


}

import { Component, OnInit } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [ContactComponent, CommonModule, RouterLink],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent implements OnInit {

  users: UserModel[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    try {
      this.userService.getUsers().subscribe(users => {
        this.users = users;
        console.log(this.users);
      });
    } catch (error) {
      console.error('Failed to get users', error);
    }
  }
}

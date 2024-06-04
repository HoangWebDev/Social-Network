import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { FriendsComponent } from './components/friends/friends.component';
import { EventComponent } from './components/event/event.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';
import { loginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [loginGuard],
    children: [
      { path: '', component: PostsComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'friends', component: FriendsComponent },
      { path: 'event', component: EventComponent },
      { path: 'profile/:id', component: ProfileComponent }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

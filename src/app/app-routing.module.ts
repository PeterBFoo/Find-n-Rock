import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { PostViewComponent } from './views/post-view/post-view.component';
import { ProfileComponent } from './views/profile/profile.component';
import { MyPostsComponent } from './views/myposts/myposts.component';
import { CreatePostComponent } from './views/create-post/create-post.component';
import { SuscribedPostsComponent } from './views/suscribed-posts/suscribed-posts.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'post/:id', component: PostViewComponent },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'user/posts', component: MyPostsComponent },
  { path: 'user/posts/suscribed', component: SuscribedPostsComponent },
  { path: 'posts/create', component: CreatePostComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

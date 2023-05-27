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
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthEntrepreneurGuard } from './shared/guards/auth-entrepreneur.guard';
import { AuthMusicGroupGuard } from './shared/guards/auth-music-group.guard';
import { EditPostComponent } from './views/edit-post/edit-post.component';
import { SuscriptionsViewComponent } from './views/suscriptions-view/suscriptions-view.component';
import { PublicProfileComponent } from './views/public-profile/public-profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'post/:id', component: PostViewComponent, canActivate: [AuthGuard] },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/posts', component: MyPostsComponent, canActivate: [AuthGuard, AuthEntrepreneurGuard] },
  { path: 'user/posts/suscribed', component: SuscribedPostsComponent, canActivate: [AuthGuard, AuthMusicGroupGuard] },
  { path: 'posts/create', component: CreatePostComponent, canActivate: [AuthGuard, AuthEntrepreneurGuard] },
  { path: 'post/edit/:id', component: EditPostComponent, canActivate: [AuthGuard, AuthEntrepreneurGuard] },
  { path: 'post/:id/suscriptions', component: SuscriptionsViewComponent, canActivate: [AuthGuard, AuthEntrepreneurGuard] },
  { path: 'user/profile/:username', component: PublicProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

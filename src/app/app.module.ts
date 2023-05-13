import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { PostComponent } from './components/post/post.component';
import { PostViewComponent } from './views/post-view/post-view.component';
import { MyPostsComponent } from './views/myposts/myposts.component';
import { SuscribedPostsComponent } from './views/suscribed-posts/suscribed-posts.component';
import { CreatePostComponent } from './views/create-post/create-post.component';
import { ProfileComponent } from './views/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    SearcherComponent,
    PostComponent,
    PostViewComponent,
    MyPostsComponent,
    SuscribedPostsComponent,
    CreatePostComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

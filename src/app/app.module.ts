import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { AuthInterceptor } from './shared/interceptors/auth-interceptor.interceptor';
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
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SuscriptionComponent } from './components/suscription/suscription.component';
import { PostOwnerComponent } from './components/post-owner/post-owner.component';
import { EditPostComponent } from './views/edit-post/edit-post.component';
import { SuscriptionsViewComponent } from './views/suscriptions-view/suscriptions-view.component';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { PublicProfileComponent } from './views/public-profile/public-profile.component';
import { FooterSmallComponent } from './components/footer-small/footer-small.component';

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
    SpinnerComponent,
    SuscriptionComponent,
    PostOwnerComponent,
    EditPostComponent,
    SuscriptionsViewComponent,
    GroupCardComponent,
    FooterComponent,
    ConfirmModalComponent,
    PublicProfileComponent,
    FooterSmallComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [
    // Registrar el interceptor como un proveedor con la clave HTTP_INTERCEPTORS
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

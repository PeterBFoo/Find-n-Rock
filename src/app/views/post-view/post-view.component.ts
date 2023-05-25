import { Component, Input } from '@angular/core';
import { Post } from 'src/app/services/interfaces/PostInterface';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post-service.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/services/interfaces/UserInterface';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent {

  post!: Post;
  currentUser: User;
  dateOfCreation!: string;
  loadedData: boolean = false;
  matchesDesiredGenres = false;

  constructor(private postService: PostService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.currentUser = this.userService.getUser();
    this.route.params.subscribe(params => {
      this.postService.getPost(params['id']).subscribe((post: Post) => {
        this.post = post;
        let postDate = new Date(post.date)
        this.dateOfCreation = postDate.toUTCString()
        this.loadedData = true;

        if (this.matchesDesiredGenrerWithUser(post)) this.matchesDesiredGenres = true;
      });
    });
  }

  suscribeToPost() {
    this.postService.suscribeToPost(this.post.id).subscribe((post: Post) => {
      this.post = post;
    });
  }

  isSuscribed() {
    let suscriptions = this.post.suscriptions;
    let suscribed = false;

    for (let i = 0; i < suscriptions.length; i++) {
      if (suscriptions[i].id == this.currentUser.id) {
        suscribed = true;
        break;
      }
    }

    return suscribed;
  }

  unsuscribeToPost() {
    this.postService.unsuscribeToPost(this.post.id).subscribe((post: Post) => {
      this.post = post;
    });
  }

  isPostOwner() {
    return this.currentUser.id == this.post.user.id;
  }

  editPost() {
    this.router.navigate(["/post", "edit", this.post.id])
  }

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe(() => {
      this.router.navigate(["/home"]);
    })
  }

  canSuscribe() {
    return this.currentUser.role.canSubscribe;
  }

  private matchesDesiredGenrerWithUser(post: Post) {
    let matches = false;
    let postGenres = post.genres;
    let userGenres = this.currentUser?.musicalGenres;

    if (!userGenres) return false;

    postGenres.forEach((genre, i) => {
      if (userGenres[i]?.name == genre.name) {
        matches = true;
      }
    })

    return matches;
  }
}

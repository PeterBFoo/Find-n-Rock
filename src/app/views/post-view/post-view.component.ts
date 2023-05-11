import { Component, Input } from '@angular/core';
import { Post } from 'src/app/services/interfaces/PostInterface';
import { ActivatedRoute } from '@angular/router';
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
  loadedData: boolean = false;

  constructor(private postService: PostService, private userService: UserService, private route: ActivatedRoute) {
    this.currentUser = this.userService.getUser();
    console.log(this.currentUser);
    this.route.params.subscribe(params => {
      this.postService.getPost(params['id']).subscribe((post: Post) => {
        this.post = post;
        this.loadedData = true;
      });
    });
  }

  suscribeToPost() {
    return true;
  }

  isSuscribed() {
    return false;
  }

  unsuscribeToPost() {
    return true;
  }

  modifyPost() {
    return true;
  }

  isOwner() {
    return this.currentUser.id == this.post.user.id;
  }

  canSuscribe() {
    return this.currentUser.role.canSubscribe;
  }
}

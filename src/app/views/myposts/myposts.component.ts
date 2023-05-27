import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { Post } from 'src/app/services/interfaces/PostInterface';
import { User } from 'src/app/services/interfaces/UserInterface';
import { PostService } from 'src/app/services/post/post-service.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-myPosts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.scss']
})
export class MyPostsComponent {
  posts!: Post[];
  currentUser!: User;
  loadedData: boolean = false;
  mode: string = 'created';

  postsNotFoundImage: string = 'assets/images/no_posts.png';

  constructor(private postService: PostService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();

    this.postService.getHistoryPosts().subscribe((posts: Post[]) => {
      this.posts = posts.filter((post: Post) => post.active);;
      this.loadedData = true;
    });
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(() => {
      this.onChangeMode();
    });
  }

  onChangeMode() {
    this.postService.getHistoryPosts().subscribe((posts: Post[]) => {
      if (this.mode === 'created') {
        this.posts = posts.filter((post: Post) => post.active);
      } else {
        this.posts = posts.filter((post: Post) => !post.active);
      }
    });
  }
}

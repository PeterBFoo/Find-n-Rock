import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/services/interfaces/PostInterface';
import { User } from 'src/app/services/interfaces/UserInterface';
import { PostService } from 'src/app/services/post/post-service.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-suscribed-posts',
  templateUrl: './suscribed-posts.component.html',
  styleUrls: ['./suscribed-posts.component.scss']
})
export class SuscribedPostsComponent {
  posts!: Post[];
  currentUser!: User;
  loadedData: boolean = false;

  postsNotFoundImage: string = 'assets/images/no_posts.png';

  constructor(private postService: PostService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();

    this.postService.getSuscribedPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      this.loadedData = true;
    });
  }

  unsuscribedEvent(postId: any) {
    this.postService.unsuscribeToPost(postId).subscribe((post: Post) => {
      this.postService.getSuscribedPosts().subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    });

  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../services/interfaces/PostInterface';
import { PostService } from '../../services/post/post-service.service';
import { User } from '../../services/interfaces/UserInterface';
import { UserService } from '../../services/user/user.service';
import { SearchData } from 'src/app/components/searcher/interfaces/SearchEventInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  posts!: Post[];
  currentUser!: User;
  loadedData: boolean = false;

  constructor(private postService: PostService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    if (!this.userService.getToken()) {
      this.router.navigate(['/login']);
      return
    }
    this.currentUser = this.userService.getUser();

    this.postService.getAllPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      this.loadedData = true;
    });
  }

  onNewSearch(searchData: any) {
    console.log(searchData)

    if (!searchData) {
      this.postService.getAllPosts().subscribe((posts: Post[]) => {
        this.posts = posts;
      });
      return;
    }

    this.postService.getPostsByFilters(searchData).subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}

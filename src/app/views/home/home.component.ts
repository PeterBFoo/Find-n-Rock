import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../services/interfaces/PostInterface';
import { PostService } from '../../services/post-service.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.postService.getAllPosts().pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
        throw err;
      })
    ).subscribe((posts: any) => {
      this.posts = posts;
    });
  }
}

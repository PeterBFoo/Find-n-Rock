import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/services/interfaces/PostInterface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() post!: Post;


  constructor(private router: Router) {
  }

  showPost() {
    this.router.navigate(['/post', this.post.id]);
  }

}

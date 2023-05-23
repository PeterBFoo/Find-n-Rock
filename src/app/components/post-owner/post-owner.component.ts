import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/services/interfaces/PostInterface';

@Component({
  selector: 'app-post-owner',
  templateUrl: './post-owner.component.html',
  styleUrls: ['./post-owner.component.scss']
})
export class PostOwnerComponent {
  @Input() post!: Post;
  @Output() deletePostEvent = new EventEmitter<number>();

  constructor(private router: Router) {

  }

  showPost() {
    this.router.navigate(['/post', this.post.id]);
  }

  modifyPost() {
    this.router.navigate(["/post", "edit", this.post.id])
  }

  deletePost() {
    this.deletePostEvent.emit(this.post.id);
  }
}

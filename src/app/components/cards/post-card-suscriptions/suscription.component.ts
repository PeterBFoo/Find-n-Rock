import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/services/interfaces/PostInterface';
import { PostService } from 'src/app/services/post/post-service.service';

@Component({
  selector: 'app-suscription',
  templateUrl: './suscription.component.html',
  styleUrls: ['./suscription.component.scss']
})
export class SuscriptionComponent {
  @Input() post!: Post;
  @Output() unsuscribedEvent = new EventEmitter<number>();

  constructor(private router: Router, private postService: PostService) {

  }

  showPost() {
    this.router.navigate(['/post', this.post.id]);
  }

  unsuscribeToPost() {
    this.unsuscribedEvent.emit(this.post.id);
  }

}

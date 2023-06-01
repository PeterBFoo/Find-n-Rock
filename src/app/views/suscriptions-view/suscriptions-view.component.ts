import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/services/interfaces/PostInterface';
import { User } from 'src/app/services/interfaces/UserInterface';
import { PostService } from 'src/app/services/post/post-service.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-suscriptions-view',
  templateUrl: './suscriptions-view.component.html',
  styleUrls: ['./suscriptions-view.component.scss']
})
export class SuscriptionsViewComponent {
  currentUser!: User;
  post!: Post;
  suscriptions!: User[];
  loadedData: boolean = false;
  selectedCandidates: string[] = [];
  noSuscriptionsImg = "assets/images/no_suscriptions.png"

  constructor(private userService: UserService, private postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.userService.getUser();
    this.route.params.subscribe(params => {
      this.postService.getPost(params['id']).subscribe((post: Post) => {
        this.post = post;
        this.suscriptions = post.suscriptions;
        this.loadedData = true;
      });
    });
  }

  addSelectedCandidate(username: any) {
    this.selectedCandidates.push(username);
    console.log(this.selectedCandidates);
  }

  removeCandidate(username: any) {
    this.selectedCandidates = this.selectedCandidates.filter(candidate => candidate !== username);
    console.log(this.selectedCandidates);
  }

  chooseCandidates() {
    this.postService.chooseCandidates(this.post.id, this.selectedCandidates).subscribe(() => {
      this.router.navigate(['/user', 'posts']);
    });
  }
}

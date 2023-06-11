import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/services/interfaces/PostInterface';
import { User } from 'src/app/services/interfaces/UserInterface';
import { WorkExperienceInterface } from 'src/app/services/interfaces/WorkExperienceInterface';
import { PostService } from 'src/app/services/post/post-service.service';
import { UserService } from 'src/app/services/user/user.service';
import { WorkExperienceService } from 'src/app/services/workExperience/work-experience.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  userProfile!: User;
  currentUser: User = this.userService.getUser();
  chosenInPosts: number = 0;
  suscribedToPosts: number = 0;
  isMusician: boolean = false;
  dataLoaded: boolean = false;
  isProfileOwner: boolean = false;
  workExperiences!: WorkExperienceInterface[];


  constructor(private userService: UserService, private workExperienceService: WorkExperienceService, private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userService.getUserByUsername(params["username"]).subscribe(user => {
        this.userProfile = user;
        this.isProfileOwner = this.currentUser.id == this.userProfile.id;
        this.isMusician = this.userProfile.role.canSubscribe;


        if (this.isMusician) {
          this.postService.getChosenPostsOfUser().subscribe(posts => {
            this.chosenInPosts = posts.length;
          });

          this.workExperienceService.getExperiences(params["username"]).subscribe(workExperiences => {
            this.workExperiences = workExperiences;
          });
        }

        this.dataLoaded = true;
      });
    });

    this.postService.getHistoryPosts().subscribe(posts => {
      this.suscribedToPosts = posts.length;
    });
  }
}

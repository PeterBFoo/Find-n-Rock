import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/services/interfaces/UserInterface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  userProfile!: User;
  currentUser: User = this.userService.getUser();
  dataLoaded: boolean = false;


  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userService.getUserByUsername(params["username"]).subscribe(user => {
        this.userProfile = user;
        this.dataLoaded = true;
      });
    });

  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Find-n-Rock';

  constructor(private router: Router, private userService: UserService) { }

  ngOnChanges(): void {
    if (!this.userService.getToken()) {
      this.router.navigate(['/login']);
    }
  }
}

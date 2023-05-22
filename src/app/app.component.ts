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

  constructor() { }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/interfaces/UserInterface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() user!: User;
  username: string = "";
  userimage: string = "";
  isGroup: boolean = false;
  isEntrepreneur: boolean = false;

  menuIsOpen: boolean = false;
  menu: HTMLDivElement | null = null;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.user?.username || "";
    this.userimage = this.user?.image || "";
    this.isGroup = this.user?.role.canSubscribe || false;
    this.isEntrepreneur = this.user?.role.canManagePosts || false;

    this.menu = document.getElementById("menu") as HTMLDivElement;
  }

  openMenu() {
    this.menu!.style.transform = "translateX(0%)";
  }

  closeMenu() {
    this.menu!.style.transform = "translateX(100%)";
  }

  onToggleMenu() {
    if (this.menuIsOpen) {
      this.closeMenu();
      this.menuIsOpen = false;
    } else {
      this.openMenu();
      this.menuIsOpen = true;
    }
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}

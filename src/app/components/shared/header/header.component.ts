import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  openMenu: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  path: string;

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
  }

  logout() {
    this.authService.logout();
  }

  menuOpen = false;

  onMenuToggle(e) {
    console.log(e)
    const navlinks = document.querySelector(".navLinks");
    e.name = e.name === "menu" ? "close" : "menu";
    this.openMenu = (e.name === "menu") ? false : true;
    navlinks.classList.toggle("left-[0%]")
  }

  goTo(url: string){
    this.router.navigate([url]);
  }
}

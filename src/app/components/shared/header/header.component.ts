import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  isAuthenticated: boolean = false;
  openMenu: boolean = false;
  isMobile = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) { }

  path: string;

  showCategories = false;
  currentCategory: any = null;
  cartItems = [
    1
    // Lista de elementos en el carrito
  ];

  categories = [
    {
      name: 'Aceites',
      products: ['Cil', 'Cocinero', 'Mirasol', 'Primor']
    },
    {
      name: 'Salsas',
      products: ['Alpesa', 'Alacena']
    },
    {
      name: 'Lejías',
      products: ['Opal', 'Sapolio']
    }
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit() {
    // this.authService.isAuthenticated$.subscribe(authenticated => {
    //   this.isAuthenticated = authenticated;
    // });
    this.checkScreenSize();

    this.cartService.cartSubject$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.cartItems = res === null ? [] : res;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  logout() {
    this.authService.signOut();
  }

  menuOpen = false;

  // onMenuToggle(e) {
  //   const navlinks = document.querySelector(".navLinks");
  //   e.name = e.name === "menu" ? "close" : "menu";
  //   this.openMenu = (e.name === "menu") ? false : true;
  //   navlinks.classList.toggle("left-[0%]")
  //   if(e.name === "menu"){
  //     document.body.classList.add('openSidebar');
  //   }else{
  //     document.body.classList.remove('openSidebar');
  //   }
  // }

  onMenuToggle() {
    this.openMenu = !this.openMenu;

    if (this.openMenu) {
      console.log('oo')
      document.body.classList.add('openSidebar');
    } else {
      document.body.classList.remove('openSidebar');
    }

  }

  goTo(url: string) {
    this.router.navigate([url]);
  }
}

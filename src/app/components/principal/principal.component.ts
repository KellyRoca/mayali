import { NeedLoginComponent } from './../dialogs/need-login/need-login.component';
import { CartItem, Product } from './../../interface/model.d';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FireDatabaseService } from '../../services/firebase/fire-database.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  // products: Product[] = [];
  hasUser: boolean = false;
  products: Product[] = [
    {
      description: "Primor 900ml caja por 12 unidades",
      id: "1",
      img: "https://firebasestorage.googleapis.com/v0/b/dexmayali-pe.appspot.com/o/premium.png?alt=media&token=45705dda-d8ce-4758-85e4-51c13ca6e04d",
      name: "Aceite primor",
      price: 300
    },
    {
      description: "Aceite Cocinero 2L",
      id: "2",
      img: "https://firebasestorage.googleapis.com/v0/b/dexmayali-pe.appspot.com/o/premium.png?alt=media&token=45705dda-d8ce-4758-85e4-51c13ca6e04d",
      name: "Aceite primor",
      price: 3
    }
  ]

  cart: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private fireDatabase: FireDatabaseService,
    private router: Router,
    private storageService: StorageService,
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.storageService.get('user').subscribe((res) => {
      this.hasUser = res == null ? false : true;
    })

    this.cartService.setProductCatalog(this.products);
    this.storageService.set('products', this.products);

    this.storageService.get('cart').subscribe((res: null | CartItem[]) => {
      if (res != null) {
        this.cart = res;
      }
    })
  }

  addToCart(product: Product) {
    if(!this.hasUser) return this.openDialogRedirect();
    let cartItem = this.cart.find(item => item.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.cart.push({ id: product.id, quantity: 1, price: product.price, name: product.name, image: product.img });
    }
    this.updateCartService();
  }

  openDialogRedirect(){
    this.dialog.open(NeedLoginComponent, {
      width: '90%',
      maxWidth: '570px',
      autoFocus: false,
      data: {
      },
      minHeight: '250px',
      disableClose: true,
    }).afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  incrementQuantity(product: Product) {
    let cartItem = this.cart.find(item => item.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    }
    this.updateCartService();
  }

  decrementQuantity(product: Product) {
    let cartItem = this.cart.find(item => item.id === product.id);
    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        this.cart = this.cart.filter(item => item.id !== product.id);
      }
    }
    this.updateCartService();
  }

  isInCart(productId: string): boolean {
    return this.cart.some(item => item.id === productId);
  }


  getCartItem(productId: string): CartItem | undefined {
    return this.cart.find(item => item.id === productId);
  }

  updateQuantity(product: Product, event: any) {
    let quantity = parseInt(event?.target?.value, 10);
    if (!isNaN(quantity) && quantity >= 1) {
      let cartItem = this.cart.find(item => item.id === product.id);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    }
    this.updateCartService();
  }


  goToCart() {
    this.cartService.setCart(this.cart);
    this.router.navigate(['/cart'],)
  }

  updateCartService() {
    this.cartService.setCart(this.cart);
    this.storageService.set('cart', this.cart);
  }
}

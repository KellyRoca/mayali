import { CartItem, Product } from './../../interface/model.d';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FireDatabaseService } from '../../services/firebase/fire-database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  // products: Product[] = [];
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
    private router: Router
  ) { }

  // addToCart(product: any) {
  //   this.cartService.addProduct(product);
  //   // productId: 1, items: 5,
  //   console.log(this.cartService.getItems())
  // }

  ngOnInit(): void {
    // this.fireDatabase.getProducts().subscribe(data => {
    //   console.log(data)
    //   this.products = data;
    // });

    this.cartService.setProductCatalog(this.products);
  }

  addToCart(product: Product) {
    let cartItem = this.cart.find(item => item.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.cart.push({ id: product.id, quantity: 1 });
    }
  }

  incrementQuantity(product: Product) {
    let cartItem = this.cart.find(item => item.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    }
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
  }


  goToCart(){
    this.cartService.updateCart(this.cart);
    this.router.navigate(['/cart'],)
  }
}

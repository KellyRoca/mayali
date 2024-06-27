import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  
  constructor(
    private cartService: CartService
  ){}

  ngOnInit(){
    console.log(this.cartService.getItems(), 'en cart component')
  }

}

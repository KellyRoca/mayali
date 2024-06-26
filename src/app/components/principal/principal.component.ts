import { Product } from './../../interface/model.d';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FireDatabaseService } from '../../services/firebase/fire-database.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  products: Product[] = [];

  constructor(private cartService: CartService,
    private fireDatabase: FireDatabaseService
  ) { }

  addToCart(product: any) {
    this.cartService.addProduct(product);
  }

  ngOnInit(): void {
    this.fireDatabase.getProducts().subscribe(data => {
      console.log(data)
      this.products = data;
    });
  }

}

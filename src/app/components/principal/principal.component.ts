import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {
  products = [
    { name: 'Primor Premium 900ml x caja 12 unidades', price: 'S/ 107.00', numberPrice: 107.00 },
    { name: 'Primor Premium 500ml x caja 24 unidades', price: 'S/ 102.00', numberPrice: 102.00 },
    { name: 'Primor Clásico 900ml x caja 12 unidades', price: 'S/ 96.00', numberPrice: 96.00 },
    { name: 'Primor Clásico 500ml x caja 24 unidades', price: 'S/ 92.00', numberPrice: 92.00 },
    // { name: 'Primor Premium 900ml x caja 12 unidades', price: 'S/ 107.00', numberPrice: 107.00 },
    // { name: 'Primor Premium 900ml x caja 12 unidades', price: 'S/ 107.00', numberPrice: 107.00 },
    // { name: 'Primor Premium 900ml x caja 12 unidades', price: 'S/ 107.00', numberPrice: 107.00 },
    // { name: 'Primor Premium 900ml x caja 12 unidades', price: 'S/ 107.00', numberPrice: 107.00 },
    // { name: 'Primor Premium 900ml x caja 12 unidades', price: 'S/ 107.00', numberPrice: 107.00 },
    // { name: 'Primor Premium 900ml x caja 12 unidades', price: 'S/ 107.00', numberPrice: 107.00 },
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addProduct(product);
  }
}

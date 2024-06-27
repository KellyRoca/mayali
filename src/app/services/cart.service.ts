import { Injectable } from '@angular/core';
import { Product } from '../interface/model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];
  private productCatalog: Product[] = [];

  addProduct(product: any) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  updateCart(productList: any){
    this.items = productList;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }


  private productCatalogSubject = new BehaviorSubject<Product[] | null>(null);
  productCatalogSubject$ = this.productCatalogSubject.asObservable();

  setProductCatalog(products: Product[]) {
    this.productCatalogSubject.next(products);
  }

  getProductCatalog() {
    return this.productCatalogSubject.getValue();
  }
}

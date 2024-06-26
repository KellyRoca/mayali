import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interface/model';

@Injectable({
  providedIn: 'root'
})
export class FireDatabaseService {

  constructor(private firestore: AngularFirestore) {}

  getProducts(): Observable<Product[]> {
    return this.firestore.collection<Product>('productos').valueChanges({ idField: 'id' });
  }
}

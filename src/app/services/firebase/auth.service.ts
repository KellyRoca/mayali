import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, lastValueFrom } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _storage: Storage | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
  
  // async signUp(email: string, password: string, firstName: string, lastName: string, middleName: string, docType: string, docNumber: string, phone: string) {
  //   const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
  //   const user = userCredential.user;
  //   if (user) {
  //     await this.firestore.collection('users').doc(user.uid).set({
  //       firstName: firstName,
  //       lastName: lastName,
  //       middleName: middleName,
  //       docType: docType,
  //       docNumber: docNumber,
  //       phone: phone,
  //       email: email
  //     });
  //     await this._storage?.set('user', { email, password, firstName, lastName, middleName, docType, docNumber, phone });
  //   }
  // }

  async signUp(email: string, password: string, firstName: string, lastName: string, middleName: string, docType: string, docNumber: string, phone: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        await this.firestore.collection('users').doc(user.uid).set({
          firstName: firstName,
          lastName: lastName,
          middleName: middleName,
          docType: docType,
          docNumber: docNumber,
          phone: phone,
          email: email
        });
        await this._storage?.set('user', { email, password, firstName, lastName, middleName, docType, docNumber, phone });
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('EMAIL_ALREADY_IN_USE');
      } else {
        throw error;
      }
    }
  }

  async signIn(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        const userDocRef = this.firestore.collection('users').doc(user.uid);
        const userDoc = await lastValueFrom(userDocRef.get());
        const userData: any = userDoc.data();
        if (userData) {
          await this._storage?.set('user', { email, password, ...userData });
        } else {
          console.error('User data not found in Firestore');
        }
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    await this._storage?.clear();
  }
  // async signUp(email: string, password: string, firstName: string, lastName: string) {
  //   const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
  //   const user = userCredential.user;
  //   if (user) {
  //     await this.firestore.collection('users').doc(user.uid).set({
  //       firstName: firstName,
  //       lastName: lastName,
  //       email: email
  //     });
  //     await this._storage?.set('user', { email, password });
  //   }
  // }

  // async signIn(email: string, password: string) {
  //   try {
  //     const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
  //     const user = userCredential.user;
  //     if (user) {
  //       const userDocRef = this.firestore.collection('users').doc(user.uid);
  //       const userDoc = await lastValueFrom(userDocRef.get());
  //       const userData: any = userDoc.data();
  //       if (userData) {
  //         await this._storage?.set('user', { email, password, ...userData });
  //       } else {
  //         console.error('User data not found in Firestore');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error signing in:', error);
  //     throw error;
  //   }
  // }

  // async logOut() {
  //   await this.afAuth.signOut();
  //   await this._storage?.clear();
  // }
}

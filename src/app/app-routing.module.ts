import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderConfirmedComponent } from './components/order-confirmed/order-confirmed.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  // { path: 'cart', component: CartComponent },
  // { path: 'order-confirmed', component: OrderConfirmedComponent },
  // { path: 'order-history', component: OrderHistoryComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'order-confirmed', component: OrderConfirmedComponent, canActivate: [authGuard] },
  { path: 'order-history', component: OrderHistoryComponent, canActivate: [authGuard] },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

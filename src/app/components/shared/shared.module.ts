import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { CardComponent } from './card/card.component';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';
import { MaterialModule } from './material.module';
import { ControlErrorHandlerPipe } from 'src/app/pipes/control-error-handler.pipe';

const components = [
  HeaderComponent,
  MenuComponent,
  CardComponent,
  HeaderMobileComponent
]

@NgModule({
  declarations: [
    ...components,
    ControlErrorHandlerPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    ...components,
    ControlErrorHandlerPipe
  ]
})
export class SharedModule { }

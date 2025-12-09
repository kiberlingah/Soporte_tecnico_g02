import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavPclienteComponent } from './nav_pcliente/nav_pcliente.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule],
  exports: [NavbarComponent] // 👈 exporta el componente
})
export class SharedModule {}

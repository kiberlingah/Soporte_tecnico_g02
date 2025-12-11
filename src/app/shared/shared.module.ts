import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavPclienteComponent } from './nav_pcliente/nav_pcliente.component';
import { NavTecnicosComponent } from './nav-tecnicos/nav-tecnicos.component';
import { NavAdminEmpComponent } from './nav-admin-emp/nav-admin-emp.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule],
  exports: [NavbarComponent] // 👈 exporta el componente
})
export class SharedModule {}

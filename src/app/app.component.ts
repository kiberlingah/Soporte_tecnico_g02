import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // 👈 aquí importas el SCSS
})
export class AppComponent {
    title = 'Soporte_tecnico_g02';
    mostrarRegistro = false;
  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  
  isAuthPage(): boolean {
    const url = this.router.url;
    return url === '/login' || url === '/register';
  }
  //en el cliente no altera nada
  isClienteDashboard(): boolean {
  return this.router.url.includes('/cliente');
}

}

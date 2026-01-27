import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-nav-pcliente',
  templateUrl: './nav_pcliente.component.html',
  styleUrls: ['./nav_pcliente.component.scss']
})
export class NavPclienteComponent {


  mostrarMenu = false;
  mostrarBuscador = false;

  constructor(private auth: AuthService,
    private router: Router) { }

  logout() {
    localStorage.clear();

    this.router.navigate(['/login'], { replaceUrl: true });
  }


}
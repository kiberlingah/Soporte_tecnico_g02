import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav-admin-emp',
  templateUrl: './nav-admin-emp.component.html',
  styleUrls: ['./nav-admin-emp.component.scss']
})
export class NavAdminEmpComponent {
  mostrarMenu = false;
  mostrarBuscador = false;
  constructor(private auth: AuthService
    , private router: Router
  ) { }

  logout() {
    localStorage.clear();

    this.router.navigate(['/empresa'], { replaceUrl: true });
  }

}

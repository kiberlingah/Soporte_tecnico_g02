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
        ) {}
      
        //ngOnInit(): void {
          //this.rol = this.auth.getRole();
        //}
        logout() {
            this.auth.logout();
            return this.router.navigate(['/empresa']);
        }

}

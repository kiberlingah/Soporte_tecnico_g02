import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav-tecnicos',
  templateUrl: './nav-tecnicos.component.html',
  styleUrls: ['./nav-tecnicos.component.scss']
})
export class NavTecnicosComponent {
      constructor(private auth: AuthService, private router: Router) {}
    
      //ngOnInit(): void {
        //this.rol = this.auth.getRole();
      //}
      logout() {
          this.auth.logout();
          return this.router.navigate(['/empresa']);
      }

}

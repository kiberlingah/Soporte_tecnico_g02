import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
  
  
  @Component({
    selector: 'app-nav-pcliente',
    templateUrl: './nav_pcliente.component.html',
    styleUrls: ['./nav_pcliente.component.scss']
  })
  //export class NavPclienteComponent implements OnInit {
    export class NavPclienteComponent {
    //rol: string | null = null;
    
    
    mostrarMenu = false;
    mostrarBuscador = false;
    
    constructor(private auth: AuthService) {}
  
    //ngOnInit(): void {
      //this.rol = this.auth.getRole();
    //}
    logout() {
        this.auth.logout();
    }

  }
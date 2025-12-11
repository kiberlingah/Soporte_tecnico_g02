import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-portal-tecnico',
  templateUrl: './portal-tecnico.component.html',
  styleUrls: ['./portal-tecnico.component.scss']
})
export class PortalTecnicoComponent {

  nusuario: string = '';
      usuario: any = {};
      mostrarMenu = false;
      mostrarBuscador = false; // ✅ propiedad para controlar la lupa expandible
    
      constructor(public auth: AuthService,
        private usuarioService: UsuarioService,
      ) { }
    
    
      ngOnInit(): void {
        const token = localStorage.getItem('token');
        const idusuario = Number(localStorage.getItem('id_usuario'));
        if (token && idusuario) {
          this.usuarioService.obtenerUser(idusuario, token).subscribe({
          next: data => this.usuario = data,
          error: err => console.error('Error al cargar cliente:', err)
        });
        } 
      }

}

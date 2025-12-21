import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-empresa',
  templateUrl: './login-empresa.component.html',
  styleUrls: ['./login-empresa.component.scss']
})
export class LoginEmpresaComponent {
  correo: string = '';
  contrasena: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  iniciarSesion(form: NgForm): void {
    

    const credentials = {
      correo: this.correo,
      contrasena: this.contrasena
    };

            if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.usuarioService.loginUsuario(credentials).subscribe({
      next: (res: any) => {

        if (!res.token) return;

        localStorage.setItem('token', res.token);
        const payload: any = jwtDecode(res.token);

        // Guardar datos del usuario
        localStorage.setItem('id_usuario', payload.id_usuario);
        localStorage.setItem('rol', payload.rol);

        // 🔥 Redirigir según el rol
        this.redirigirPorRol(payload.rol);
      },
      error: () => {
        Swal.fire({
          icon: "error",
          title: "Credenciales inválidas",
          text: "El correo o la contraseña es incorrecto.",
        });
      }
    });
  }

  redirigirPorRol(rol: string) {
    switch (rol) {
      // case 'admin_sistema':
      //   this.router.navigate(['/admin-sistema/home']);
      //   break;

      case 'admin_empresa':
        this.router.navigate(['/company/portalAdminEmp']);
        break;

      case 'tecnico':
        this.router.navigate(['/company/portalTecnico']);
        break;

      default:
        this.router.navigate(['/']);
        break;
    }
  }

  volverAlInicio() {
    this.router.navigate(['/']);
  }

}

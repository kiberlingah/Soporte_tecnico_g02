import { Component } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Campos enlazados con ngModel
  correo: string = '';
  contrasena: string = '';

  // Mensajes de feedback
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private clienteService: ClienteService, private router: Router) { }

  // iniciarSesion(formValue: any): void {
  //   const credentials = {
  //     correo: this.correo,
  //     contrasena: this.contrasena // ⚠️ el backend espera "password"
  //   };
  //   this.clienteService.loginCliente(credentials).subscribe({
  //     next: (res: any) => {
  //       if (res.token) {
  //         //localStorage.setItem('token', res.token);
  //         //localStorage.setItem('id_cliente', res.id_cliente);
  //         this.mensajeExito = '✅ Login exitoso';
  //         this.mensajeError = '';
  //         // Redirige al perfil o dashboard
  //         this.router.navigate(['/cliente/dashboard']);
  //       }
  //     },
  //     error: (err: any) => {
  //       console.error('Error en login:', err);
  //       this.mensajeError = '❌ Credenciales inválidas';
  //       this.mensajeExito = '';
  //     }
  //   });
  // }

  iniciarSesion(form: NgForm): void {

    const credentials = {
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.clienteService.loginCliente(credentials).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          const payload: any = jwtDecode(res.token);
          localStorage.setItem('id_cliente', payload.id_cliente);
          this.mensajeExito = '✅ Login exitoso';
          this.mensajeError = '';
          this.router.navigate(['/cliente/dashboard']);
        }
      },
      error: (err: any) => {
        console.error('Error en login:', err);
        Swal.fire({
          icon: "error",
          title: "Credenciales inválidas",
          text: "El correo o la contraseña no son correctos. Por favor, comprueba tus credenciales e intenta de nuevo.",
          confirmButtonText: "Aceptar",
        });
      }
    });
  }

  volverAlInicio(): void {
    this.router.navigate(['/']); // redirige al inicio
  }

  redirigirRegistro(): void {
    this.router.navigate(['/register']); // redirige al registro
  }
}

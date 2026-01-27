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
  correo: string = '';
  contrasena: string = '';


  constructor(private clienteService: ClienteService, private router: Router) { }

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

    this.clienteService.loginCliente(credentials).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          const payload: any = jwtDecode(res.token);
          localStorage.setItem('id_cliente', payload.id_cliente);

          this.router.navigate(['/cliente/dashboard']);
        }
      },
      error: (err: any) => {
        Swal.fire({
          icon: "error",
          title: "Credenciales inválidas",
          text: "El correo o la contraseña no son correctos. Por favor, comprueba tus credenciales e intenta de nuevo.",
          confirmButtonText: "Aceptar",
        });

      },

    });
  }

  volverAlInicio(): void {
    this.router.navigate(['/']);
  }

  redirigirRegistro(): void {
    this.router.navigate(['/register']);
  }
}

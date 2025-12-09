import { Component } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // Propiedades enlazadas con ngModel
  nombres: string = '';
  apellidos: string = '';
  telefono: string = '';
  correo: string = '';
  contrasena: string = '';

  // Mensaje de éxito
  mensajeExito: string = '';

  constructor(private clienteService: ClienteService, private router: Router) {}

  registrar(formValue: any): void {
    const cliente = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      telefono: this.telefono,
      correo: this.correo,
      contrasena: this.contrasena // ⚠️ backend espera "password"
    };

    this.clienteService.registrarCliente(cliente).subscribe({
      next: (res: any) => {
        this.mensajeExito = '✅ Cliente registrado correctamente';
        console.log(res);
      },
      error: (err: any) => console.error('Error en registro:', err)
    });
  }

  volverAlInicio(): void {
    this.router.navigate(['/']); // redirige al inicio
  }

  redirigirLogin(): void {
    this.router.navigate(['/login']); // redirige al login
  }
}

import { Component } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

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

registrar(formRegisterClient: NgForm): void {
  const cliente = {
    nombres: this.nombres,
    apellidos: this.apellidos,
    telefono: this.telefono,
    correo: this.correo,
    contrasena: this.contrasena
  };

  if (formRegisterClient.invalid) {
    return;
  }

  this.clienteService.registrarCliente(cliente).subscribe({
    next: () => {
      Swal.fire({
        title: '✅ Registro exitoso',
        text: 'Se ha registrado con éxito tu cuenta',
        html: `
    <p>Su cuenta ha sido registrada con éxito.</p>
    <p>En breve recibirá un correo de confirmación.</p>
    <p>Por favor verifique en su correo un codigo de confirmación</p>
    <p>Si no se encuentra en su bandeja de entrada, revise su carpeta de spam.</p>
  `,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        window.location.reload();
      });

    },
    error: err => console.error('Error en registro', err)
  });
}

tieneMayuscula(): boolean {
  return /[A-Z]/.test(this.contrasena || '');
}

tieneMinuscula(): boolean {
  return /[a-z]/.test(this.contrasena || '');
}

tieneNumero(): boolean {
  return /[0-9]/.test(this.contrasena || '');
}

tieneSimbolo(): boolean {
  return /[.,@$!%*?&]/.test(this.contrasena || '');
}

longitudValida(): boolean {
  return (this.contrasena || '').length >= 8;
}

  volverAlInicio(): void {
    this.router.navigate(['/']); 
  }

  redirigirLogin(): void {
    this.router.navigate(['/login']); 
  }
}

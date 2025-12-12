import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  cliente: any = {};
  token: string | null = null;
  formCuenta!: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder
  ) {}


  // ngOnInit(): void {
  //   this.token = localStorage.getItem('token');
  //   const idCliente = ;  // quiero obtener el id_cliente del cliente que inicio sesión con el token
    
  //   if (this.token) {
  //     this.clienteService.obtenerCliente(idCliente, this.token).subscribe({
  //       next: (data: any) => this.cliente = data,
  //       error: (err: any) => console.error('Error al cargar datos del cliente:', err)
  //     });
  //   }
  // }

    ngOnInit(): void {
    this.token = localStorage.getItem('token');
    const idCliente = Number(localStorage.getItem('id_cliente'));

    // Inicializar formulario reactivo con validaciones
    this.formCuenta = this.fb.group({
      id_cliente: [idCliente, Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.minLength(6)]] // opcional, solo si se quiere cambiar
    });

    // Cargar datos del cliente desde la API
    if (this.token && idCliente) {
      this.clienteService.obtenerCliente(idCliente, this.token).subscribe({
        next: data => {
          this.cliente = data;
          this.formCuenta.patchValue({
            id_cliente: data.id_cliente,
            nombres: data.nombres,
            apellidos: data.apellidos,
            telefono: data.telefono,
            correo: data.correo,
            contrasena: '' // nunca mostrar la contraseña real
          });
        },
        error: err => console.error('Error al cargar cliente:', err)
      });
    }
  }

  
 editarCuenta(): void {
    if (this.formCuenta.invalid) {
      alert('⚠️ Por favor completa todos los campos correctamente.');
      return;
    }

    if (this.token) {
      const clienteActualizado = { ...this.formCuenta.value };

      // Si no se ingresó nueva contraseña, eliminar el campo para no sobreescribir
      if (!clienteActualizado.contrasena) {
        delete clienteActualizado.contrasena;
      }

      console.log('🧪 Datos enviados al backend:', clienteActualizado);

      this.clienteService.actualizarCliente(clienteActualizado, this.token).subscribe({
        next: () => alert('✅ Cuenta actualizada correctamente'),
        error: (err: any) => console.error('Error al actualizar cuenta:', err)
      });
    }
  }

  eliminarCuenta(): void {
    if (this.token) {
      const idCliente = Number(localStorage.getItem('id_cliente'));
      this.clienteService.eliminarCliente(idCliente, this.token).subscribe({
        next: () => alert('🗑️ Cuenta eliminada correctamente'),
        error: err => console.error('Error al eliminar cuenta:', err)
      });
    }
  }
}
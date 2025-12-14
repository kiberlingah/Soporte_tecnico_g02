import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  // cliente: any = {};
  // token: string | null = null;
  // formCuenta!: FormGroup;

  // constructor(
  //   private clienteService: ClienteService,
  //   private fb: FormBuilder
  // ) {}


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

  //     ngOnInit(): void {
  //     this.token = localStorage.getItem('token');
  //     const idCliente = Number(localStorage.getItem('id_cliente'));

  //     // Inicializar formulario reactivo con validaciones
  //     this.formCuenta = this.fb.group({
  //       id_cliente: [idCliente, Validators.required],
  //       nombres: ['', Validators.required],
  //       apellidos: ['', Validators.required],
  //       telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
  //       correo: ['', [Validators.required, Validators.email]],
  //       contrasena: ['', [Validators.minLength(6)]] // opcional, solo si se quiere cambiar
  //     });

  //     // Cargar datos del cliente desde la API
  // if (this.token && idCliente) {
  //   this.clienteService.obtenerCliente(idCliente, this.token).subscribe({
  //     next: data => {
  //       this.cliente = data;
  //       this.formCuenta.patchValue({
  //         id_cliente: data.id_cliente,
  //         nombres: data.nombres,
  //         apellidos: data.apellidos,
  //         telefono: data.telefono,
  //         correo: data.correo,
  //         contrasena: '' // nunca mostrar la contraseña real
  //       });
  //     },
  //     error: err => console.error('Error al cargar cliente:', err)
  //   });
  // }
  //   }


  //  editarCuenta(): void {


  //     // if (this.formCuenta.invalid) {
  //     //   alert('⚠️ Por favor completa todos los campos correctamente.');
  //     //   return;
  //     // }
  //       if (this.formCuenta.invalid) {
  //       Object.values(this.formCuenta.controls).forEach(control => {
  //         control.markAsTouched();
  //       });
  //       return;
  //     }

  //     if (this.token) {
  //       const clienteActualizado = { ...this.formCuenta.value };

  //       // Si no se ingresó nueva contraseña, eliminar el campo para no sobreescribir

  //       if (!clienteActualizado.contrasena) {
  //         delete clienteActualizado.contrasena;
  //       } 

  //       console.log('🧪 Datos enviados al backend:', clienteActualizado);

  //       this.clienteService.actualizarCliente(clienteActualizado, this.token).subscribe({
  //         next: () => alert('✅ Cuenta actualizada correctamente'),
  //         error: (err: any) => console.error('Error al actualizar cuenta:', err)
  //       });
  //     }
  //   }

  formCuenta!: FormGroup;
  token!: string;
  idCliente!: number;


  mensaje = '';
  error = '';

  cliente: any = {};


  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.token = localStorage.getItem('token') || '';
    this.idCliente = Number(localStorage.getItem('id_cliente'));

    if (this.token && this.idCliente) {
      this.clienteService.obtenerCliente(this.idCliente, this.token).subscribe({
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

    this.formCuenta = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(9)]],
      correo: [{ value: '', disabled: true }],
      contrasenaActual: ['', [Validators.required, Validators.minLength(6)]]
    });



    // 👉 Si ya tienes los datos del cliente
    this.formCuenta.patchValue({
      nombres: this.cliente.nombres,
      apellidos: this.cliente.apellidos,
      telefono: this.cliente.telefono,
      correo: this.cliente.correo
    });
  }

  editarCuenta(): void {

    if (this.formCuenta.invalid) {
      this.formCuenta.markAllAsTouched();
      return;
    }

    const data = this.formCuenta.getRawValue();

    this.clienteService.actualizarCliente(
      this.idCliente,
      data,
      this.token
    ).subscribe({
      next: () => {
        Swal.fire({
          title: 'Actualización de datos exitosa',
          text: 'Sus datos se han actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        Swal.fire('Error', err.error?.error || 'Error al actualizar', 'error').then(() => {
          window.location.reload();
        });
      }
    });
  }

eliminarCuenta() {
  const token = localStorage.getItem('token');
  const idCliente = Number(localStorage.getItem('id_cliente'));

  if (!token || !idCliente) return;

  this.clienteService
    .solicitarEliminacion(idCliente, token)
    .subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Cuenta inactivada',
          text: 'Tienes 30 días para reactivarla antes de que se elimine definitivamente',
          confirmButtonText: 'Entendido'
        }).then(() => {
          localStorage.clear();
          this.router.navigate(['/login']);
        });
      },
      error: err => {
        Swal.fire(
          'Error',
          err.error?.error || 'No se pudo procesar la solicitud',
          'error'
        );
      }
    });
}

  // eliminarCuenta(): void {
  //   if (this.token) {
  //     const idCliente = Number(localStorage.getItem('id_cliente'));
  //     this.clienteService.eliminarCliente(idCliente, this.token).subscribe({
  //       next: () => alert('🗑️ Cuenta eliminada correctamente'),
  //       error: err => console.error('Error al eliminar cuenta:', err)
  //     });
  //   }
  // }
}
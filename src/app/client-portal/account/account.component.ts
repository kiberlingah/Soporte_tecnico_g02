import { Component, Inject, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  cliente: any = {};
  token: string | null = null;

  constructor(
    private clienteService: ClienteService
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
  const token = localStorage.getItem('token');
  const idCliente = Number(localStorage.getItem('id_cliente'));

  if (token && idCliente) {
    this.clienteService.obtenerCliente(idCliente, token).subscribe({
      next: data => this.cliente = data,
      error: err => console.error('Error al cargar cliente:', err)
    });
  }
}


  editarCuenta(): void {
    if (this.token) {
      this.clienteService.actualizarCliente(this.cliente, this.token).subscribe({
        next: () => alert('✅ Cuenta actualizada correctamente'),
        error: (err: any) => console.error('Error al actualizar cuenta:', err)
      });
    }
  }

  eliminarCuenta(): void {
    if (this.token) {
      const idCliente = Number(localStorage.getItem('id_cliente')); // ⚠️ Reemplaza con el ID real
      this.clienteService.eliminarCliente(idCliente, this.token).subscribe({
        next: () => alert('🗑️ Cuenta eliminada correctamente'),
        error: (err: any) => console.error('Error al eliminar cuenta:', err)
      });
    }
  }
}

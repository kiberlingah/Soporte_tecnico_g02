import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.component.html',
  styleUrls: ['./dashboard-cliente.component.scss']
})
export class DashboardClienteComponent {
  
  ncliente: string = '';
  cliente: any = {};
  mostrarMenu = false;
  mostrarBuscador = false; // ✅ propiedad para controlar la lupa expandible

  constructor(public auth: AuthService,
    private clienteService: ClienteService
  ) { }


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const idcliente = Number(localStorage.getItem('id_cliente'));
    if (token && idcliente) {
      this.clienteService.obtenerCliente(idcliente, token).subscribe({
      next: data => this.cliente = data,
      error: err => console.error('Error al cargar cliente:', err)
    });
    } 
  }
}

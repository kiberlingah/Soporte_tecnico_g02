import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {


  constructor(private historialService: HistorialService,
    private clienteService: ClienteService
  ) {}


  listaPagos: any[] = [];
idCliente!: number;

ngOnInit(): void {
  this.idCliente = Number(localStorage.getItem('id_cliente'));  
  this.cargarPagos();
}

cargarPagos() {
  this.clienteService.obtenerListaPagos(this.idCliente).subscribe({
    next: (resp) => {
      console.log("Pagos recibidos:", resp);
      this.listaPagos = resp;
    },
    error: (err) => {
      console.error("Error al obtener pagos:", err);
    }
  });
}
}

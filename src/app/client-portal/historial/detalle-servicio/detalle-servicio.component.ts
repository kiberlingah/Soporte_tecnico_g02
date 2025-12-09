import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.scss']
})
export class DetalleServicioComponent implements OnInit {
  servicio: any = {};

  constructor(
    private historialService: HistorialService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.historialService.obtenerDetalleServicio(id).subscribe({
      next: (data: any) => this.servicio = data,
      error: (err: any) => console.error('Error al cargar detalle:', err)
    });
  }
}

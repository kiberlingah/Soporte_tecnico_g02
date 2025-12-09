import { Component, OnInit } from '@angular/core';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  servicios: any[] = [];

  constructor(private historialService: HistorialService) {}

  ngOnInit(): void {
    this.historialService.obtenerHistorial().subscribe({
      next: (data: any[]) => this.servicios = data,
      error: (err: any) => console.error('Error al cargar historial:', err)
    });
  }
}

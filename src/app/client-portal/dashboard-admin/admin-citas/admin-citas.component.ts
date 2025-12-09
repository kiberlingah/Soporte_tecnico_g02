import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-citas',
  templateUrl: './admin-citas.component.html',
  styleUrls: ['./admin-citas.component.scss']
})
export class AdminCitasComponent {
  filtroNombre = '';
  filtroFecha = '';
  filtroDistrito = '';
  paginaActual = 1;
  paginas = [1, 2, 3, 4, 5];

  citas = [
    { id: '001', cliente: 'Manuela Paredes', tecnico: '', fecha: '2026-03-12', hora: '08:00', modalidad: 'Remoto', distrito: '' },
    { id: '002', cliente: 'Carmen Lara', tecnico: '', fecha: '2026-03-12', hora: '12:00', modalidad: 'A domicilio', distrito: 'San Borja' },
    { id: '003', cliente: 'Martín Loayza', tecnico: '', fecha: '2026-03-12', hora: '14:00', modalidad: 'Presencial', distrito: '' }
  ];

  citasFiltradas = [...this.citas];

  constructor(private router: Router) {}

  filtrar() {
    this.citasFiltradas = this.citas.filter(cita =>
      cita.cliente.toLowerCase().includes(this.filtroNombre.toLowerCase()) &&
      (!this.filtroFecha || cita.fecha === this.filtroFecha) &&
      (!this.filtroDistrito || cita.distrito.toLowerCase().includes(this.filtroDistrito.toLowerCase()))
    );
  }

  verDetalle(id: string) {
    this.router.navigate(['/admin/citas', id]);
  }

  irPagina(pagina: number) {
    this.paginaActual = pagina;
    // Aquí puedes implementar lógica real de paginación si usas API
  }
}

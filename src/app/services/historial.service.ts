import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class HistorialService {
  private baseUrl = `${environment.urlHost}/servicios`;
  //private baseUrl = 'https://spyrocode.dev/api'; // si usas prefijo /api

  constructor(private http: HttpClient) {}

  // Obtener historial completo
  obtenerHistorial(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar`);
  }

  // Obtener detalle de un servicio por ID
  obtenerDetalleServicio(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ver?id=${id}`);
  }
}

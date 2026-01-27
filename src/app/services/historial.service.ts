import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class HistorialService {
  private baseUrl = `${environment.urlHost}/servicios`;

  constructor(private http: HttpClient) {}

  obtenerHistorial(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar`);
  }

  obtenerDetalleServicio(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ver?id=${id}`);
  }
}

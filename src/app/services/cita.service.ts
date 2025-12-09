import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class CitaService {
  //private baseUrl = 'https://spyrocode.dev';
  private baseUrl = `${environment.urlHost}/citas`;

  constructor(private http: HttpClient) {}

  registrarCitaDiagnostico(cita: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cita_pago`, cita);
  }

  // actualizarCliente(cliente: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/actualizar`, cliente);
  // }

  // eliminarCliente(id: number): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/eliminar?id=${id}`);
  // }
}

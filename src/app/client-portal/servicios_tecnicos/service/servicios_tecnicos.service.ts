import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class ServiciosTecnicosService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.urlHost}/servicios_tecnicos`;

  registrarServicio(servicio: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/instalacion_pago`, servicio);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class TarifaService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.urlHost}/tarifas`;

  listar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar`);
  }

  obtener(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/ver?id_tarifa=${id}`);
  }

  obtenerPorDistrito() {
    return this.http.get('/tarifas_distritos');
  }

  obtenerTarifaDistrito(idDistrito: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/verdistrito?id_distrito=${idDistrito}`);
  }
}


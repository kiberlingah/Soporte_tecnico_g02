import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class ServicioService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.urlHost}/servicios`;
  

  registrarServicio(servicio: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/servicio_pago`, servicio);
  }

  listarServicio(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`);
  }

getServiciosReparacion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listaReparacion`);
  }
  
  getServiciosInstalacion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listaInstalacion`);
  }

  getServicioId(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/ver?id_servicio=${id}`);
  }
}


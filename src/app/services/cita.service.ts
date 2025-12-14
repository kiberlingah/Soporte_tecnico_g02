import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class CitaService {
  [x: string]: any;
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
   getCitaDetalle(id_cita: number): Observable<any> {
    const url = `${this.baseUrl}/obtenerId?id_cita=${id_cita}`;
    return this.http.get<any>(url);
  }

  getCitasStatusPendient(): Observable<any[]> {
    const url = `${this.baseUrl}/listapendientes`;
    return this.http.get<any[]>(url);
  }

  getCitasTecnico(id_usuario: number): Observable<any[]> {
    const url = `${this.baseUrl}/listatecnico?id_usuario=${id_usuario}`;
    return this.http.get<any[]>(url);
  }

 
  asignarTecnicoUpdate(cita: any): Observable<any> {
    const url = `${this.baseUrl}/asignar-tecnico`;
    const body = {
      id_cita: cita.id_cita,
      id_usuario: cita.id_usuario
    };
    return this.http.put<any>(url, body);
  }

  comentarioUpdate(cita: any): Observable<any> {
    const url = `${this.baseUrl}/comentario-tecnico`;
    const body = {
      id_cita: cita.id_cita,
      observacion_tecnico: cita.observacion_tecnico
    };
    return this.http.put<any>(url, body);
  }
  finalizarCita(data: any): Observable<any> {
    const url = `${this.baseUrl}/finalizar`;
    return this.http.post<any>(url, data);
  }
}

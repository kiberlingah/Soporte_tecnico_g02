import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class ServiciosTecnicosService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.urlHost}/servicios_tecnicos`;

  registrarServicio(servicio_tecnico: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/instalacion_pago`, servicio_tecnico);
  }
  registrarServicioReparacion(servicio_tecnico: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reparacion`, servicio_tecnico);
  }

  obtenerServicioFaltaPago(idCliente: number, idCita: number) {
  return this.http.get<any[]>(
    `${this.baseUrl}/falta-pago`,
    {
      params: {
        id_cliente: idCliente,
        id_cita: idCita
      }
    }
  );
}
registrarPago(data: any) {
  return this.http.post(
    `${this.baseUrl}/registrar-pago-rep`,
    data
  );
}

   getStDetalle(id_st: number): Observable<any> {
    const url = `${this.baseUrl}/obtenerId?id_servicio_tecnico=${id_st}`;
    return this.http.get<any>(url);
  }

  getStStatusPendient(): Observable<any[]> {
    const url = `${this.baseUrl}/listapendientes`;
    return this.http.get<any[]>(url);
  }

  getStTecnico(id_usuario: number): Observable<any[]> {
    const url = `${this.baseUrl}/listatecnico?id_usuario=${id_usuario}`;
    return this.http.get<any[]>(url);
  }

 
  asignarStTecnicoUpdate(st: any): Observable<any> {
    const url = `${this.baseUrl}/asignar-tecnico`;
    const body = {
      id_servicio_tecnico: st.id_servicio_tecnico,
      id_usuario: st.id_usuario
    };
    return this.http.put<any>(url, body);
  }

  comentarioStUpdate(st: any): Observable<any> {
    const url = `${this.baseUrl}/comentario-tecnico`;
    const body = {
      id_servicio_tecnico: st.id_servicio_tecnico,
      observacion_tecnico: st.observacion_tecnico
    };
    return this.http.put<any>(url, body);
  }
}

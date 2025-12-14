import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private baseUrl = `${environment.urlHost}/clientes`;
  //private baseUrl = 'http://localhost/clientes';

  constructor(private http: HttpClient) { }

  registrarCliente(cliente: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar`, cliente);
  }

  loginCliente(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  obtenerCliente(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/ver?id_cliente=${id}`, { headers });
  }

  // actualizarCliente(cliente: any, token: string): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.put(`${this.baseUrl}/actualizar`, cliente, { headers });
  // }
  actualizarCliente( id_cliente: number, data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'});
    return this.http.put( `${this.baseUrl}/actualizar?id_cliente=${id_cliente}`, data, { headers });
  }

  eliminarCliente(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/eliminar?id_cliente=${id}`, { headers });
  }

  obtenerListaPagos(id_cliente: number): Observable<any[]> {
    const url = `${this.baseUrl}/lista_pagos?id_cliente=${id_cliente}`;
    return this.http.get<any[]>(url);
  }

  detallePago(id_pago: number): Observable<any> {
    const url = `${this.baseUrl}/detalles_pago?id_pago=${id_pago}`;
    return this.http.get<any>(url);
  }

  listarClientes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`);
  }

  solicitarEliminacion(idCliente: number, token: string) {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.put(
    `${this.baseUrl}/solicitar_eliminacion?id_cliente=${idCliente}`,
    {},
    { headers }
  );
}

obtenerUncliente(id:number): Observable<any> {
  return this.http.get<any[]>(`${this.baseUrl}/ver?id_cliente=${id}`);
}

}

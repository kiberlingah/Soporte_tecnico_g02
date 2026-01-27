import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private baseUrl = `${environment.urlHost}/usuarios`;

  constructor(private http: HttpClient) { }

  loginUsuario(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  listar() {
    return this.http.get(`${this.baseUrl}/listar`);
  }

  obtener() {
    return this.http.get(`${this.baseUrl}/ver`);
  }

  registrar(data: any) {
    return this.http.post(`${this.baseUrl}/registrar`, data);
  }

  actualizar(data: any) {
    return this.http.put(`${this.baseUrl}/actualizar`, data);
  }

  eliminar() {
    return this.http.delete(`${this.baseUrl}/eliminar`);
  }

  listarUsuarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`);
  }

  listaUsuariosTecnicos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lista_tecnicos`);
  }

  obtenerUser(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/ver?id_usuario=${id}`, { headers });
  }

}

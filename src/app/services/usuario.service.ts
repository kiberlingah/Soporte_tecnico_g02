import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private baseUrl = 'http://localhost:8000/usuarios';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get(`${this.baseUrl}`);
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
}

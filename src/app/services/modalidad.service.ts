import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class ModalidadService {

private baseUrl = `${environment.urlHost}/modalidades`;

  constructor(private http: HttpClient) {}

  getModalidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar`);
  }
  getModalidadId(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/ver?id_modalidad=${id}`);
  }

  listarModalidades(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`);
  }

}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class DistritoService {

  private baseUrl = `${environment.urlHost}/distritos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/listar`);
}
}

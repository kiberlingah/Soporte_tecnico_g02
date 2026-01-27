import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private role: string | null = null;

  constructor(private router: Router, private clienteService: ClienteService) {}

  mensajeExito: string = '';
  mensajeError: string = '';

  loginMock(rol: 'cliente' | 'admin' | 'tecnico') {
    this.role = rol;
    localStorage.setItem('rol', rol);
    localStorage.setItem('token', 'fake-token-123'); 
    
    this.redirectHomeByRole(); 
  }


  getRole(): string | null {
    return this.role || localStorage.getItem('rol');
  }

  isLoggedIn(): boolean {
    return !!this.getRole();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getIdCliente(): string | null {
    return localStorage.getItem('id_cliente');
  }

  redirectHomeByRole(): string {
    const rol = this.getRole();
    if (rol === 'cliente') {
      this.router.navigate(['/inicio']);
      return '/inicio';
    }
    if (rol === 'admin') {
      this.router.navigate(['/admin']);
      return '/admin';
    }
    if (rol === 'tecnico') {
      this.router.navigate(['/tecnico']);
      return '/tecnico';
    }
    this.router.navigate(['/login']);
    return '/login';
  }

  logout() {
    this.role = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

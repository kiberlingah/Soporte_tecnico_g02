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
  // Simulación de login
  loginMock(rol: 'cliente' | 'admin' | 'tecnico') {
    this.role = rol;
    localStorage.setItem('rol', rol);
    localStorage.setItem('token', 'fake-token-123'); // token simulado
    
    this.redirectHomeByRole(); // redirige según rol
  }

//   loginReal(correo: string, contrasena: string) {
//   this.clienteService.loginCliente({ correo, contrasena }).subscribe({
//     next: (resp: any) => {
//       if (resp.success) {
//         // Guardar token
//         localStorage.setItem('token', resp.token);
        
//         // Guardar el id_cliente real
//         localStorage.setItem('id_cliente', resp.id_cliente);
//         this.mensajeExito = '✅ Login exitoso';
//           this.mensajeError = '';
//           this.router.navigate(['/cliente/dashboard']);
//       }
//     },
//     error: (err) => {
//       console.error("Error login:", err);
//       this.mensajeError = '❌ Credenciales inválidas';
//       this.mensajeExito = '';
//     }
//   });
// }

  // Obtener rol actual
  getRole(): string | null {
    return this.role || localStorage.getItem('rol');
  }

  // Verificar si está logueado
  isLoggedIn(): boolean {
    return !!this.getRole();
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getIdCliente(): string | null {
    return localStorage.getItem('id_cliente');
  }

  // Redirección según rol (siempre devuelve string)
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

  // Cerrar sesión
  logout() {
    this.role = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

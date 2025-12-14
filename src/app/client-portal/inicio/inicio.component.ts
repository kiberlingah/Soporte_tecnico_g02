import { Component } from '@angular/core';
import { Router } from '@angular/router';

type Mensaje = { rol: 'bot' | 'user'; texto: string };

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  constructor(private router: Router) { }

//   chatAbierto = false;
//   entrada = '';
//   mensajes: Mensaje[] = [
//     { rol: 'bot', texto: 'Hola 👋 Soy tu asistente. ¿En qué puedo ayudarte hoy?' }
//   ];
//   escribiendo = false;
//   toggleChat(): void {
//     this.chatAbierto = !this.chatAbierto;
//   }

//   enviarPregunta(texto: string): void {
//     this.mensajes.push({ rol: 'user', texto });
//     this.escribiendo = true;
//     const respuesta = this.responder(texto);
//     setTimeout(() => {
//       this.mensajes.push({ rol: 'bot', texto: respuesta });
//       this.escribiendo = false;
//     }, 1200); // efecto "escribiendo..."
//   }

//   onSubmit(event: Event): void {
//     event.preventDefault();
//     const texto = this.entrada.trim();
//     if (!texto) return;
//     this.enviarPregunta(texto);
//     this.entrada = '';
//   }

//  private responder(texto: string): string {
//   const t = texto.toLowerCase();

//   // Registro
//     if (t.includes('registrar') || t.includes('crear cuenta') || t.includes('registro')) {
//       return 'Para registrarte, haz clic en "Registrar cuenta" en la parte superior derecha. Llena tus datos y crea tu contraseña segura. Luego podrás acceder a todos nuestros servicios.';
//     }

//     // Inicio de sesión
//     if (t.includes('iniciar') || t.includes('login') || t.includes('sesion')) {
//       return 'Para iniciar sesión, usa el botón "Iniciar sesión" en la esquina superior derecha. Ingresa tu correo y contraseña. Si olvidaste tu contraseña, hay un enlace para recuperarla debajo del formulario.';
//     }

//     // Recuperar contraseña
//     if (t.includes('olvidé') || t.includes('contraseña')) {
//       return 'No te preocupes 🙌. Haz clic en "¿Olvidaste tu contraseña?" en la pantalla de inicio de sesión y sigue las instrucciones para recuperarla.';
//     }

//     // Agendar cita
//     if (t.includes('cita') || t.includes('agendar') || t.includes('agenda')) {
//       return 'Para agendar una cita, primero inicia sesión. Luego entra a la sección "Citas", selecciona el servicio que necesitas (diagnóstico, instalación, soporte) y elige fecha y hora disponibles.';
//     }

//     // Tarifas
//     if (t.includes('tarifa') || t.includes('precio') || t.includes('costo')) {
//       return 'Las tarifas dependen del servicio y modalidad (remoto, a domicilio, en oficina o express). Una vez que inicies sesión, podrás ver el detalle de precios según tu distrito y el tipo de atención que elijas.';
//     }

//     // Modalidades de atención
//     if (t.includes('modalidad') || t.includes('tipo de atención') || t.includes('cómo atienden')) {
//       return 'Tenemos varias modalidades de atención: \n\n' +
//              '👉 Remoto: soporte en línea para incidencias de software.\n' +
//              '👉 A domicilio: un técnico visita tu distrito, ideal para hardware o instalaciones.\n' +
//              '👉 En oficina: puedes traer tu equipo a nuestro taller.\n' +
//              '👉 Express: atención prioritaria con tiempos más rápidos.\n\n' +
//              'Inicia sesión para elegir la modalidad que prefieras al agendar tu cita.';
//     }

//     // Servicios disponibles
//     if (t.includes('servicio') || t.includes('soporte') || t.includes('instalación') || t.includes('diagnóstico')) {
//       return 'Ofrecemos diagnóstico de equipos, instalación de software, soporte remoto y soporte a domicilio. Inicia sesión para ver tus servicios activos y solicitar nuevos.';
//     }

//     // Orientación general
//     if (t.includes('no sé') || t.includes('ayuda') || t.includes('nuevo')) {
//       return 'Tranquilo, estoy aquí para guiarte 💙. Puedes registrarte si aún no tienes cuenta, iniciar sesión si ya la creaste, y desde tu panel acceder a citas, tarifas y servicios. ¿Quieres que te muestre cómo empezar paso a paso?';
//     }

//     // Respuesta por defecto
//     return 'Puedo ayudarte con registro, inicio de sesión, recuperar contraseña, agendar citas, tarifas, modalidades y servicios. ¿Sobre qué quieres saber más ahora?';
//   }
  redirigirRegistro(): void {
    this.router.navigate(['/register']); // redirige al registro
  }

    ngAfterViewInit() {

    // evitar cargarlo dos veces
    if (!document.getElementById('livechatai-script')) {

      // crear contenedor si no existe
      if (!document.getElementById('livechatai-container')) {
        const container = document.createElement('div');
        container.id = 'livechatai-container';
        document.body.appendChild(container);
      }

      const script = document.createElement('script');
      script.id = 'livechatai-script';
      script.src = 'https://app.livechatai.com/embed.js';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-id', 'cmiqu0nh40003jo04k7qx2e12');

      document.body.appendChild(script);
    }
  }



  
}

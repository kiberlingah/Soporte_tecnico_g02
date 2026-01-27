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

  redirigirRegistro(): void {
    this.router.navigate(['/register']); 
  }

    ngAfterViewInit() {

    if (!document.getElementById('livechatai-script')) {

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

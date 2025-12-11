import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform(lista: any[], texto: string): any[] {
    if (!texto) return lista;
    texto = texto.toLowerCase();

    return lista.filter(item =>
      JSON.stringify(item).toLowerCase().includes(texto)
    );
  }

}

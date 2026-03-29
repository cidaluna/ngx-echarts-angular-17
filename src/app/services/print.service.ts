import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  print() {
    // Pequeno truque: dispara um evento de resize global para o ECharts ler
    window.dispatchEvent(new Event('resize'));

    // Aguarda um pequeno delay para o layout estabilizar antes de abrir o PDF
    setTimeout(() => {
      window.print();
    }, 300);
  }
}

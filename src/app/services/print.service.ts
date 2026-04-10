import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  print() {
    // ativa modo print só para dashboard
    document.body.classList.add('print-dashboard');

    window.dispatchEvent(new Event('resize'));

    setTimeout(() => {
      window.print();

      // remove depois
      setTimeout(() => {
        document.body.classList.remove('print-dashboard');
      }, 500);

    }, 500);
  }
}

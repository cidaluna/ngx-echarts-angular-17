import { inject, Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);
  private apiCustomers = 'http://localhost:3000/customers';
  private apiUser = 'http://localhost:3000/user';


  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiCustomers);
  }

  //  verifica acesso se o usuário tem acesso total (simulando verificação de assinatura ativa)
  hasFullAccess(): Observable<{ hasFullAccess: boolean }> {
    return this.http.get<{ hasFullAccess: boolean }>(this.apiUser);
  }

  //  contratar (simula cobrança) além de dar acesso total
  contractFullAccess(): Observable<any> {
    return this.http.patch(this.apiUser, {
      hasFullAccess: true
    });
  }

  //  opcional (cancelar) para remover acesso total, caso queira testar o fluxo de cobrança novamente sem precisar resetar o banco
  revokeAccess(): Observable<any> {
    return this.http.patch(this.apiUser, {
      hasFullAccess: false
    });
  }

}

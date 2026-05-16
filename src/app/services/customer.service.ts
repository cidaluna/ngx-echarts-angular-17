import { inject, Injectable } from '@angular/core';
import { ICustomer, ICustomerTableAccess } from '../interfaces/customer.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);
  private apiCustomers = 'http://localhost:3000/customers';
  private apiTableAccess = 'http://localhost:3000/customerTableAccess';
  private userId = 123;
  private id = 9;

  // Consulta se o user tem direito de ver todos os registros da tabela
  checkAccess(): Observable<boolean> {
    return this.http
      .get<ICustomerTableAccess[]>(`${this.apiTableAccess}?userId=${this.userId}`)
      .pipe(map((access) => access[0]?.hasAccess ?? false));
  }

  // Simula a contratação e libera o acesso a todos os registros
  confirmPurchase(): Observable<ICustomerTableAccess> {
    return this.http.patch<ICustomerTableAccess>(`${this.apiTableAccess}/${this.id}`, {
      hasAccess: true,
    });
  }

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.apiCustomers);
  }

  //  opcional (cancelar) para remover acesso total, caso queira testar o fluxo de cobrança novamente sem precisar resetar o banco
  // revokeAccess(): Observable<any> {
  //   return this.http.patch(this.apiUser, {
  //     hasFullAccess: false
  //   });
  // }

}

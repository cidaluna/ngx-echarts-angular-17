import { inject, Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);
  private api = 'http://localhost:3000/customers';

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.api);
  }
}

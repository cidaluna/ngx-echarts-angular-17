import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AdminTableActions } from './admin-table.actions'; // Ajuste o caminho
import { CustomerService } from '../../services/customer.service'; // Ajuste o caminho

@Injectable()
export class AdminTableEffects {
  // Injeção de dependências moderna via inject() fora do construtor
  private actions$ = inject(Actions);
  private customerService = inject(CustomerService);

  loadCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      // 1. Escuta a action que dispara o início do carregamento
      ofType(AdminTableActions.loadCustomers),

      // 2. Clássico switchMap para fazer a chamada HTTP ao JSON Server
      switchMap(() =>
        this.customerService.getCustomers().pipe(

          // 3. Sucesso: Emite a action com a lista de clientes carregada
          map((customers) =>
            AdminTableActions.loadCustomersSuccess({ customers })
          ),

          // 4. Erro: Captura a falha sem quebrar o fluxo (Stream) do Effect
          catchError((error) =>
            of(AdminTableActions.loadCustomersFailure({ error: error.message }))
          )
        )
      )
    );
  });

  checkCustomerTableAccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminTableActions.checkCustomerTableAccess),

      switchMap(() =>
        this.customerService.checkAccess().pipe(
          map((hasAccess) =>
            AdminTableActions.checkCustomerTableAccessSuccess({ hasAccess })
          ),
          catchError(() =>
            of(AdminTableActions.checkCustomerTableAccessFailure({ error: `Não foi possível verificar o acesso a tabela.` }))
          )
        )
      )
    );
  });

  confirmShowAllCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminTableActions.confirmShowAllCustomers),

      switchMap(() =>
        this.customerService.confirmPurchase().pipe(
          map(() =>
            AdminTableActions.confirmShowAllCustomersSuccess()
          ),
          catchError(() =>
            of(AdminTableActions.confirmShowAllCustomersFailure({ error: `Não foi possível confirmar a contratação.` }))
          )
        )
      )
    );
  });

  resetUserAccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminTableActions.resetUserAccess),

      switchMap(() =>
        this.customerService.revokeAccess().pipe(
          map(() =>
            AdminTableActions.resetUserAccessSuccess()
          ),
          catchError(() =>
            of(AdminTableActions.resetUserAccessFailure({ error: `Não foi possível resetar o usuário.` }))
          )
        )
      )
    );
  });
}

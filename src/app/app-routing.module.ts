import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';


const routes: Routes = [
  { path: 'history', component: TransactionHistoryComponent },
  { path: 'add-transaction', component: AddTransactionComponent },
  { path: '', redirectTo: 'history', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

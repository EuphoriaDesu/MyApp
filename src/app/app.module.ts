import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';


@NgModule({
  declarations: [
    AppComponent,
    TransactionHistoryComponent,
    AddTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

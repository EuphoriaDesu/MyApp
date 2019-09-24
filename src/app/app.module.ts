import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { balanceReducer } from './balance-store.reducer';
import { InMemoryDataService } from './in-memory-data.service';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionHistoryComponent,
    TransactionCreateComponent,
    TransactionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    StoreModule.forRoot({ balance: balanceReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

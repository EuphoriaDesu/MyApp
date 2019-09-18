import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { StoreModule } from '@ngrx/store';
import { balanceReducer } from './balance-store.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TransactionHistoryComponent,
    TransactionCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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

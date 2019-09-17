import { Injectable } from '@angular/core';
import { Transaction } from './transaction';
import { TransactionType } from './transaction-type.enum';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const INCOME = TransactionType.INCOME;
    const OUTGO = TransactionType.OUTGO;
    const transactions: Transaction[] = [
      { id: 1, type: INCOME, amount: 500 },
      { id: 2, type: OUTGO, amount: 500 },
      { id: 3, type: INCOME, amount: 500 },
      { id: 4, type: OUTGO, amount: 500 },
      { id: 5, type: INCOME, amount: 500 },
      { id: 6, type: INCOME, amount: 500 },
      { id: 7, type: OUTGO, amount: 500 }
    ];
    return {transactions};
  }

  genId(transactions: Transaction[]) {
    return transactions.length > 0 ? Math.max(...transactions.map(transaction => transaction.id)) + 1 : 1;
  }
}

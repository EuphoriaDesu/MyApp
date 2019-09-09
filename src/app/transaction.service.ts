import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TRANSACTIONS } from './mock-transactions';
import { Transaction } from './transaction';
import { TransactionType } from './transaction-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  balance = 0;
  transactions: Transaction[];

  constructor() {
    this.transactions = TRANSACTIONS;
    this.balance = this.getFinalBalance();
  }

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }

  setTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
    this.balance = this.getFinalBalance();
  }

  getBalance(): number {
    return this.balance;
  }

  deleteTransaction(transaction: Transaction) {
    const index = this.transactions.indexOf(transaction);
    if (index === 0) {
      this.transactions.shift();
    } else if (index === this.transactions.length - 1) {
      this.transactions.pop();
    } else {
      this.transactions.splice(index, 1);
    }
    this.balance = this.getFinalBalance();
  }

  getLastTransaction(): Transaction {
    return TRANSACTIONS[TRANSACTIONS.length - 1];
  }

  private getFinalBalance(): number {
    return this.transactions.reduce((sum, current) => {
      return sum += current.type === TransactionType.INCOME ? current.amount : -current.amount;
    }, 0);
  }
}

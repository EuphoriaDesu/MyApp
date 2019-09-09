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
    this.balance = this.getInitialBalance();
    this.transactions = TRANSACTIONS;
  }

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }

  setTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
    this.balance += transaction.type === TransactionType.INCOME ? transaction.amount : -transaction.amount;
  }

  getBalance(): number {
    return this.balance;
  }

  deleteTransaction(transaction: Transaction) {
    const index = this.transactions.indexOf(transaction);
    this.balance += transaction.type === TransactionType.INCOME ? -transaction.amount : transaction.amount;
    if (index === 0) {
      this.transactions.shift();
    } else if (index === this.transactions.length - 1) {
      this.transactions.pop();
    } else {
      this.transactions = [...this.transactions.slice(0, index), ...this.transactions.slice(index + 1)];
    }
  }

  getLastTransaction(): Transaction {
    return TRANSACTIONS[TRANSACTIONS.length - 1];
  }

  private getInitialBalance(): number {
    let balance = 0;
    TRANSACTIONS.forEach(transaction => {
      if (transaction.type === TransactionType.INCOME) {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    });
    return balance;
  }
}

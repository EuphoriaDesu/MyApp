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
    this.updateBalance();
  }

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }

  createTransaction(transaction: Transaction) {
    transaction.id = this.transactions.length + 1;
    this.transactions.push(transaction);
    this.updateBalance();
  }

  getBalance(): number {
    return this.balance;
  }

  deleteTransaction(transaction: Transaction) {
    this.transactions = this.transactions.filter(t => t !== transaction);
    this.updateBalance();
  }

  getLastTransaction(): Transaction {
    return TRANSACTIONS[TRANSACTIONS.length - 1];
  }

  private updateBalance(): void {
    this.balance = this.transactions.reduce((sum, current) => {
      return current.type === TransactionType.INCOME ? sum + current.amount : sum - current.amount;
    }, 0);
  }
}

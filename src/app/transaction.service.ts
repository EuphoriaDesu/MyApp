import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { TRANSACTIONS } from './mock-transactions';
import { Transaction } from './transaction';
import { TransactionType } from './transaction-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  balance$ = new BehaviorSubject(0);
  private transactions: Transaction[];

  constructor() {
    this.transactions = TRANSACTIONS;
    this.updateBalance();
  }

  getTransactions() {
    return of(this.transactions);
  }

  createTransaction(transaction: Transaction) {
    const id = this.transactions[this.transactions.length - 1].id + 1;
    transaction.id = id;
    this.transactions.push(transaction);
    this.updateBalance();
  }

  getBalance$() {
    return this.balance$.asObservable();
  }

  deleteTransaction(transaction: Transaction) {
    this.transactions = this.transactions.filter(t => t !== transaction);
    this.updateBalance();
  }

  private updateBalance() {
    const balance = this.transactions.reduce((sum, current) => {
      return current.type === TransactionType.INCOME ? sum + current.amount : sum - current.amount;
    }, 0);
    this.balance$.next(balance);
  }
}

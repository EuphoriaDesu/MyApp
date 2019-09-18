import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Transaction } from './transaction';
import { TransactionType } from './transaction-type.enum';
import { Store } from '@ngrx/store';
import { setInitialBalance, addTransactionAmount, deleteTransactionAmount } from './balanceStore.actions';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionsUrl = 'api/transactions';
  private balanceSubject = new BehaviorSubject(0);
  private transactions: Transaction[];
  balance$: Observable<number>;

  constructor(private http: HttpClient, private balanceStore: Store<{ balance: number }>) {
    this.balance$ = this.balanceSubject.asObservable();
  }

  getTransactions() {
    return this.http.get<Transaction[]>(this.transactionsUrl)
      .pipe(
        tap(transactions => this.balanceStore.dispatch(setInitialBalance({ transactions }))),
        catchError(this.handleError<Transaction[]>('getTransactions', []))
      );
  }

  createTransaction(transaction: Transaction) {
    return this.http.post<Transaction>(this.transactionsUrl, transaction, httpOptions)
      .pipe(
        tap(createdTransaction => this.balanceStore.dispatch(addTransactionAmount({ transaction }))),
        catchError(this.handleError<Transaction[]>('createTransactions'))
      );
  }

  deleteTransaction(transaction: Transaction) {
    const url = `${this.transactionsUrl}/${transaction.id}`;
    return this.http.delete<Transaction>(url, httpOptions)
      .pipe(
        tap(() => this.balanceStore.dispatch(deleteTransactionAmount({ transaction }))),
        catchError(this.handleError<Transaction>('deleteTransaction'))
      );
  }

  // private updateBalance() {
  //   const balance = this.transactions.reduce((sum, current) => {
  //     return current._type === TransactionType.INCOME ? sum + current.amount : sum - current.amount;
  //   }, 0);
  //   this.balanceSubject.next(balance);
  // }

  private handleError<T>(operation = '', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed ${error}`);
      return of(result as T);
    };
  }
}

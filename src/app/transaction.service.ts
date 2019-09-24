import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { addTransactionAmount, deleteTransactionAmount, setBalance } from './balance-store.actions';
import { Transaction } from './transaction';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionsUrl = 'api/transactions';

  constructor(private http: HttpClient,
              private balanceStore: Store<{balance: number}>) {
  }

  public getTransactions() {
    return this.http.get<Transaction[]>(this.transactionsUrl)
      .pipe(
        tap(transactions => this.balanceStore.dispatch(setBalance({transactions}))),
        catchError(this.handleError<Transaction[]>('getTransactions', []))
      );
  }

  public createTransaction(transaction: Transaction) {
    return this.http.post<Transaction>(this.transactionsUrl, transaction, httpOptions)
      .pipe(
        tap(() => this.balanceStore.dispatch(addTransactionAmount({transaction}))),
        catchError(this.handleError<Transaction[]>('createTransactions'))
      );
  }

  public deleteTransaction(transaction: Transaction) {
    const url = `${this.transactionsUrl}/${transaction.id}`;
    return this.http.delete<Transaction>(url, httpOptions)
      .pipe(
        tap(() => this.balanceStore.dispatch(deleteTransactionAmount({transaction}))),
        catchError(this.handleError<Transaction>('deleteTransaction'))
      );
  }

  public updateTransaction(transaction: Transaction) {
    return this.http.put(this.transactionsUrl, transaction, httpOptions)
      .pipe(
        tap(() => this.getTransactions().subscribe(transactions => this.balanceStore.dispatch(setBalance({transactions})))),
        catchError(this.handleError<Transaction>('updateTransaction'))
      );
  }

  private handleError<T>(operation = '', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed ${error}`);
      return of(result as T);
    };
  }
}

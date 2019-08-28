import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TRANSACTIONS } from '../mock-transactions';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service'

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit, AfterViewInit {
  el: HTMLElement;
  transactions: Transaction[];
  balance: number;
  selectedTransaction: Transaction;
  onSelect(transaction: Transaction): void {
    this.selectedTransaction = transaction;
  }
  deleteTransaction(transaction: Transaction) {
    this.transactionService.deleteTransaction(transaction);
    this.getTransactions();
    this.balance = this.transactionService.getBalance();
  }
  getTransactions () {
    this.transactionService.getTransactions().subscribe(transactions => this.transactions = transactions);
  }
  constructor(private transactionService: TransactionService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.getTransactions();
    this.balance = this.transactionService.getBalance();
  }
  ngAfterViewInit() {
    console.log("1");
    
  }
}

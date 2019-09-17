import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  private transactions: Transaction[];
  private balance: number;
  private selectedTransaction = null;

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.getTransactions();
    this.transactionService.getBalance$().subscribe(balance => {
      this.balance = balance;
    });
  }

  onSelect(transaction: Transaction) {
    this.selectedTransaction = transaction;
  }

  isSelected(transaction: Transaction) {
    return transaction === this.selectedTransaction;
  }

  deleteTransaction(transaction: Transaction) {
    this.transactionService.deleteTransaction(transaction);
    this.getTransactions();
  //  this.balance = this.transactionService.getBalance();
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe(transactions => this.transactions = transactions);
  }
}

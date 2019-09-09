import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  transactions: Transaction[];
  balance: number;
  selectedTransaction = null;

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.getTransactions();
    this.balance = this.transactionService.getBalance();
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
    this.balance = this.transactionService.getBalance();
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe(transactions => this.transactions = transactions);
  }
}

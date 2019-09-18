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
  private selectedTransaction: Transaction;
  private deletedTransaction: Transaction;


  isDeleted = false;
  balance: number;

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(transactions => this.transactions = transactions);
    this.transactionService.balance$.subscribe(balance => this.balance = balance);
  }

  onSelect(transaction: Transaction) {
    this.selectedTransaction = transaction;
  }

  isSelectedToDelete(transaction: Transaction) {
    return transaction === this.deletedTransaction;
  }

  isSelected(transaction: Transaction) {
    return transaction === this.selectedTransaction;
  }

  deleteTransaction(transaction: Transaction) {
    this.deletedTransaction = transaction;
    this.transactionService.deleteTransaction(transaction).subscribe(() => {
      this.transactions = this.transactions.filter(t => t !== transaction);
    });
  }
}

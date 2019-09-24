import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionService } from '../transaction.service';
import { Transaction } from './../transaction';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  private transactions: Transaction[];
  private selectedTransaction: Transaction;
  private deletedTransaction: Transaction;
  private editedTransaction: Transaction;

  balance: number;

  constructor(private balanceStore: Store<{balance: number}>,
              private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(transactions => this.transactions = transactions);
    this.balanceStore.subscribe(state => this.balance = state.balance);
  }

  loadTransactionsTemplate(transaction: Transaction) {
    return this.editedTransaction === transaction ? this.editTemplate : this.readOnlyTemplate;
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

  editTransaction(transaction: Transaction) {
    if (this.editedTransaction === transaction) {
      this.editedTransaction = null;
    } else {
      this.selectedTransaction = null;
      this.editedTransaction = transaction;
    }
  }

  deleteTransaction(transaction: Transaction) {
    this.deletedTransaction = transaction;
    this.transactionService.deleteTransaction(transaction).subscribe(() => {
      this.transactions = this.transactions.filter(t => t !== transaction);
    });
  }

  onSubmit(transaction: Transaction) {
    transaction.id = this.editedTransaction.id;
    this.transactionService.updateTransaction(transaction).subscribe((s) => {
      this.transactions[this.editedTransaction.id - 1] = transaction;
      this.editedTransaction = null;
    });
  }

  onCloseModal() {
    this.editedTransaction = null;
  }
}

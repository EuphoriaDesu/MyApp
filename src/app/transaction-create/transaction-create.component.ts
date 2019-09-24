import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionType } from '../transaction-type.enum';
import { TransactionService } from '../transaction.service';
import { Transaction } from './../transaction';


@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {
  private balance: number;

  isBalanceInvalid = false;

  constructor(private balanceStore: Store<{balance: number}>,
              private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.balanceStore.subscribe(state => {
      if (state.balance === null) {
        this.transactionService.getTransactions().subscribe();
      }
      this.balance = state.balance;
    });
  }

  onSubmit(transaction: Transaction) {
    const isValid = transaction.type === TransactionType.OUTGO && this.balance > transaction.amount;
    if (isValid) {
      this.transactionService.createTransaction(transaction).subscribe();
    } else {
      this.isBalanceInvalid = true;
    }
  }
}

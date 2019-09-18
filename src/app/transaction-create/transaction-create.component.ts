import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Transaction } from '../transaction';
import { TransactionType } from '../transaction-type.enum';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {
  private balance: number;
  private amountStr: string = null;
  private transaction = new Transaction();

  isInvalid: boolean;

  constructor(private transactionService: TransactionService,
              private balanceStore: Store<{balance: number}>) {
  }

  ngOnInit() {
    this.balanceStore.subscribe(state => {
      if (state.balance === null) {
        this.transactionService.getTransactions().subscribe();
      }
      this.balance = state.balance;
    });
  }

  onSubmit() {
    if (this.transaction.type === TransactionType.OUTGO && this.balance < +this.amountStr) {
      this.isInvalid = true;
      return;
    }
    this.isInvalid = false;
    this.transaction.amount = +this.amountStr;
    this.transactionService.createTransaction(this.transaction).subscribe();
  }

  canCreate() {
    return !!this.amountStr && +this.amountStr !== 0 && this.transaction.type;
  }

  numberOnly(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }
}

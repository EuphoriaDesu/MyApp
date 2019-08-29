import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionType } from '../transaction-type.enum';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})

export class AddTransactionComponent implements OnInit {
  balance: number;
  amountStr: string = null;
  transaction = new Transaction();

  constructor(private transActionService: TransactionService) {
  }

  ngOnInit() {
    this.balance = this.transActionService.getBalance();
  }

  isActive() {
    return !!this.amountStr;
  }

  numberOnly(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }

  onSubmit() {
    if (this.transaction.type === TransactionType.OUTGO && this.balance < +this.amountStr) {
      alert('Something went wrong');
      return;
    }
    this.transaction.id = this.transActionService.getLastTransaction().id + 1;
    this.transaction.amount = +this.amountStr;
    this.transActionService.setTransaction(this.transaction);
    this.balance = this.transActionService.getBalance();
  }
}

import { Component, OnInit } from '@angular/core';
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

  constructor(private transActionService: TransactionService) {
  }

  ngOnInit() {
    this.transActionService.getBalance$().subscribe(balance => {
      this.balance = balance;
    });
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
    this.transaction.amount = +this.amountStr;
    this.transActionService.createTransaction(new Transaction({...this.transaction}));
  //  this.balance = this.transActionService.getBalance();
  }
}

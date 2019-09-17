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

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.transactionService.balance$.subscribe(balance => this.balance = balance);
  }

  canCreate() {
    return !!this.amountStr && this.transaction.type;
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
    this.transactionService.createTransaction(this.transaction).subscribe();
  }
}

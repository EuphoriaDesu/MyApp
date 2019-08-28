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
  transaction: Transaction = {
    id: null,
    type: '',
    amount: null
  }
  constructor(private transActionService: TransactionService) {

  }

  ngOnInit() {
    this.balance = this.transActionService.getBalance();
  }
  checkType (): boolean {
    if(this.transaction.amount === null) return false;
    if(isNaN(+this.transaction.amount)) return false;
    return true;
  }
  onSubmit () {
    
    if( this.transaction.type === TransactionType.OUTGO && this.balance < +this.transaction.amount){
      alert("Something went wrong");
      return;
    }
    this.transaction.id = this.transActionService.getLastTransaction().id + 1;
    this.transaction.amount = Number(this.transaction.amount);
    this.transActionService.setTransaction(this.transaction);
    this.balance = this.transActionService.getBalance();
  }

}

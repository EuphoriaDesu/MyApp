import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Transaction } from './../transaction';
import { TransactionType } from './../transaction-type.enum';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
  @Input() set isBalanceInvalid(value: boolean) {
    this.inputAmount.setErrors(value ? {greaterThanNull: value} : null);
  }
  @Output() formSubmited = new EventEmitter<Transaction>();
  @Output() isBalanceInvalidChange = new EventEmitter<boolean>();

  private transaction = new Transaction();

  canCreate: boolean;
  inputAmount: FormControl = new FormControl('', [Validators.required, Validators.pattern('[1-9][0-9]*')]);

  constructor() {
    this.transaction.type = TransactionType.INCOME;
    this.inputAmount.statusChanges.subscribe(() => {
      if (this.inputAmount.valid) {
        this.isBalanceInvalidChange.emit(false);
      }
      this.canCreate = this.inputAmount.valid;
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.transaction.amount = +this.inputAmount.value;
    this.formSubmited.emit(this.transaction);
  }
}

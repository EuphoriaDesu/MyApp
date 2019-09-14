import { Transaction } from './transaction';
import { TransactionType } from './transaction-type.enum';

const OUTGO = TransactionType.OUTGO;
const INCOME = TransactionType.INCOME;

export let TRANSACTIONS: Transaction[] = [
  { id: 1, type: INCOME, amount: 500 },
  { id: 2, type: OUTGO, amount: 500 },
  { id: 3, type: INCOME, amount: 500 },
  { id: 4, type: OUTGO, amount: 500 },
  { id: 5, type: INCOME, amount: 500 },
  { id: 6, type: INCOME, amount: 500 },
  { id: 7, type: OUTGO, amount: 500 }
];

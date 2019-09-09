import { Transaction } from './transaction';
import { TransactionType } from './transaction-type.enum';

const OUTGO = TransactionType.OUTGO;
const INCOME = TransactionType.INCOME;

export let TRANSACTIONS: Transaction[] = [
  { id: 11, type: INCOME, amount: 500 },
  { id: 12, type: OUTGO, amount: 500 },
  { id: 13, type: INCOME, amount: 500 },
  { id: 14, type: OUTGO, amount: 500 },
  { id: 15, type: INCOME, amount: 500 },
  { id: 16, type: INCOME, amount: 500 },
  { id: 17, type: OUTGO, amount: 500 }
];

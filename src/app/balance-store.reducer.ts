import { Action, createReducer, on } from '@ngrx/store';
import { addTransactionAmount, deleteTransactionAmount, setBalance } from './balance-store.actions';
import { TransactionType } from './transaction-type.enum';

export const initialState = null;

const _balanceReducer = createReducer(initialState,
  on(setBalance, (state, {transactions}) => {
    return transactions.reduce((sum, current) => {
      return current.type === TransactionType.INCOME ? sum + current.amount : sum - current.amount;
    }, 0);
  }),
  on(addTransactionAmount, (state, {transaction}) => {
    return transaction.type === TransactionType.INCOME ? state + transaction.amount : state - transaction.amount;
  }),
  on(deleteTransactionAmount, (state, {transaction}) => {
    return transaction.type === TransactionType.OUTGO ? state + transaction.amount : state - transaction.amount;
  })
);

export function balanceReducer(state: number, action: Action) {
  return _balanceReducer(state, action);
}

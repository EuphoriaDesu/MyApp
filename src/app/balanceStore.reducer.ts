import { createReducer, on } from '@ngrx/store';
import { setInitialBalance, deleteTransactionAmount, addTransactionAmount } from './balanceStore.actions';
import { TransactionType } from './transaction-type.enum';

export const initialState = 0;

const _balanceReducer = createReducer(initialState,
  on(setInitialBalance, (state, { transactions } ) => {
    return transactions.reduce((sum, current) => {
      return current.type === TransactionType.INCOME ? sum + current.amount : sum - current.amount;
    }, 0);
  }),
  on(deleteTransactionAmount, (state, { transaction }) => {
    return transaction.type === TransactionType.OUTGO ? state + transaction.amount : state - transaction.amount;
  }),
  on(addTransactionAmount, (state, { transaction }) => {
    return transaction.type === TransactionType.INCOME ? state + transaction.amount : state - transaction.amount;
  })
);

export function balanceReducer(state, action) {
  return _balanceReducer(state, action);
}

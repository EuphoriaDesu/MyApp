import { createAction, props } from '@ngrx/store';
import { Transaction } from './transaction';

export const setBalance = createAction('[Balance] Get Initial Balance', props<{transactions: Transaction[]}>());
export const deleteTransactionAmount = createAction('[Balance] Delete Transaction Amount', props<{transaction: Transaction}>());
export const addTransactionAmount = createAction('[Balance] Add Transaction Amount', props<{transaction: Transaction}>());

export class Transaction {
  id: number = null;
  type = '';
  amount: number = null;

  constructor(transaction?: Transaction) {
    if (transaction) {
      this.id = transaction.id;
      this.type = transaction.type;
      this.amount = transaction.amount;
    }
  }
}

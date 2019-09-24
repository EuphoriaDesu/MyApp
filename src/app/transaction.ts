export class Transaction {
  public id: number = null;
  public type = '';
  public amount: number = null;
  public description = '';

  constructor(transaction?: Transaction) {
    if (transaction) {
      this.id = transaction.id;
      this.type = transaction.type;
      this.amount = transaction.amount;
      this.description = transaction.description;
    }
  }
}

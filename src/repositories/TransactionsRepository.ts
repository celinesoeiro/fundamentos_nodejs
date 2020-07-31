import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let inValue = 0;
    let outValue = 0;
    let arr = this.transactions;

    if (arr.length > 0){
      arr.map(t => {
        t.type === 'income' ?
        inValue += t.value :
        outValue += t.value;
      })
    }

    let totalValue = inValue - outValue;

    return { income: inValue, outcome: outValue, total: totalValue};
  }

  public create({title, value, type}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

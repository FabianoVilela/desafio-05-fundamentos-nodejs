import TransactionsRepository from '../repositories/TransactionsRepository';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class BalanceTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Balance {
    const transactions = this.transactionsRepository.all();
    let balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    if (transactions.length === 0) return balance;

    const sumValues = (accum: number, curr: number): number => accum + curr;

    const income = transactions
      .map(x => {
        return x.type === 'income' ? x.value : 0;
      })
      .reduce(sumValues);

    const outcome = transactions
      .map(x => {
        return x.type === 'outcome' ? x.value : 0;
      })
      .reduce(sumValues);

    const total = income - outcome;

    balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }
}

export default BalanceTransactionService;

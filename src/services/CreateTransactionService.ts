import TransactionsRepository from '../repositories/TransactionsRepository';
import BalanceTransactionService from './BalanceTransactionService';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balanceTransaction = new BalanceTransactionService(
      this.transactionsRepository,
    );

    if (!['income', 'outcome'].includes(type))
      throw Error('Tipo de operação inválido!');

    const { total } = balanceTransaction.execute();
    if (type === 'outcome' && value > total) throw Error('Saldo insuficiente!');

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;

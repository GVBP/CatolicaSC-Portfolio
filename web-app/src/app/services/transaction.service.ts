import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../interface/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: Transaction[] = Array.from({ length: 100 }, (_, k) => this.createNewTransaction(k + 1));

  readonly baseUrl = '';

  constructor() { }

  // Função que simula a criação de uma nova transação
  private createNewTransaction(id: number): Transaction {
    const categories = ['Despesa', 'Receita'];
    return {
      id: id.toString(),
      situacao: 'Pago',
      data: '01/09/2024',
      descricao: 'Descrição da transação ' + id,
      categoria: categories[Math.floor(Math.random() * categories.length)],
      valor: (Math.random() * 1000).toFixed(2)
    };
  }

  // Retorna um Observable com as transações (simulado)
  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }
}

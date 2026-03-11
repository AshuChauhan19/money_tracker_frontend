import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankService } from '../../../services/bank.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  loading = false;

  constructor(private bankService: BankService) { }

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.loading = true;
    this.bankService.getTransactions().subscribe({
      next: (res: any) => {
        this.loading = false;
        if (!res.error) {
          this.transactions = res.result;
        }
      },
      error: () => this.loading = false
    });
  }

  getCategoryIcon(category: string): string {
    const icons: any = {
      'Food & Dining': '🍔',
      'Shopping': '🛍️',
      'Salary Credit': '💰',
      'Utilities': '🔌',
      'Entertainment': '🎬',
      'Uncategorized': '📦'
    };
    return icons[category] || '💸';
  }
}

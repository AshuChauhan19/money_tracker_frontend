import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss'
})
export class BudgetsComponent {
  budgets = [
    { category: 'Groceries', spent: 450, limit: 600, color: '#6366f1' },
    { category: 'Entertainment', spent: 280, limit: 200, color: '#ef4444' },
    { category: 'Transport', spent: 120, limit: 300, color: '#10b981' },
    { category: 'Shopping', spent: 540, limit: 800, color: '#f59e0b' },
    { category: 'Utilities', spent: 185, limit: 200, color: '#a855f7' }
  ];

  getPercentage(spent: number, limit: number): number {
    const p = (spent / limit) * 100;
    return p > 100 ? 100 : p;
  }
}

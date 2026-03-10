import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  stats = [
    { label: 'Total Balance', value: '$24,592.00', trend: '+12.5%', icon: '💰' },
    { label: 'Monthly Income', value: '$4,200.00', trend: '+5.2%', icon: '📈' },
    { label: 'Monthly Expenses', value: '$2,140.50', trend: '-2.1%', icon: '📉' },
    { label: 'Savings Goal', value: '82%', trend: '+4.0%', icon: '🎯' }
  ];

  recentTransactions = [
    { name: 'Apple Store', category: 'Technology', date: 'Mar 10, 2024', amount: '-$199.00', status: 'Completed' },
    { name: 'Starbucks Coffee', category: 'Food & Drink', date: 'Mar 09, 2024', amount: '-$12.50', status: 'Completed' },
    { name: 'Monthly Salary', category: 'Income', date: 'Mar 01, 2024', amount: '+$4,200.00', status: 'Completed' },
    { name: 'House Rent', category: 'Housing', date: 'Mar 01, 2024', amount: '-$1,200.00', status: 'Completed' }
  ];
}

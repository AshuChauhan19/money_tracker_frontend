import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  transactions = [
    { name: 'Apple Store', category: 'Technology', date: 'Mar 10, 2024', amount: '-$199.00', status: 'Completed', method: 'Chase Sapphire' },
    { name: 'Starbucks Coffee', category: 'Food & Drink', date: 'Mar 09, 2024', amount: '-$12.50', status: 'Completed', method: 'Wells Fargo' },
    { name: 'Amazon.com', category: 'Shopping', date: 'Mar 08, 2024', amount: '-$84.20', status: 'Completed', method: 'Chase Sapphire' },
    { name: 'Monthly Salary', category: 'Income', date: 'Mar 01, 2024', amount: '+$4,200.00', status: 'Completed', method: 'Wells Fargo' },
    { name: 'Netflix Subscription', category: 'Entertainment', date: 'Feb 28, 2024', amount: '-$15.99', status: 'Completed', method: 'American Express' },
    { name: 'Uber Trip', category: 'Transport', date: 'Feb 27, 2024', amount: '-$24.50', status: 'Completed', method: 'Chase Sapphire' },
    { name: 'House Rent', category: 'Housing', date: 'Feb 01, 2024', amount: '-$1,200.00', status: 'Completed', method: 'Wells Fargo' }
  ];

  categories = ['All', 'Income', 'Shopping', 'Food & Drink', 'Entertainment', 'Housing', 'Technology'];
}

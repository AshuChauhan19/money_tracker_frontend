import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investments.component.html',
  styleUrl: './investments.component.scss'
})
export class InvestmentsComponent {
  portfolio = [
    { symbol: 'AAPL', name: 'Apple Inc.', value: '$12,450.00', change: '+2.4%', quantity: '65', icon: '🍏' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', value: '$8,200.00', change: '-1.2%', quantity: '42', icon: '⚡' },
    { symbol: 'BTC', name: 'Bitcoin', value: '$24,500.00', change: '+5.8%', quantity: '0.45', icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', value: '$9,050.50', change: '+3.1%', quantity: '3.2', icon: '💎' }
  ];
}

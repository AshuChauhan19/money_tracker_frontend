import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent {
  bankAccounts = [
    { name: 'Chase Sapphire', type: 'Credit Card', balance: '$12,450.00', number: '•••• 4242', icon: '💳', color: '#6366f1' },
    { name: 'Wells Fargo', type: 'Checking', balance: '$4,592.00', number: '•••• 8812', icon: '🏦', color: '#10b981' },
    { name: 'American Express', type: 'Credit Card', balance: '$2,100.50', number: '•••• 1004', icon: '💳', color: '#f59e0b' },
    { name: 'Vanguard', type: 'Investment', balance: '$54,200.00', number: '•••• 5521', icon: '📈', color: '#a855f7' }
  ];
}

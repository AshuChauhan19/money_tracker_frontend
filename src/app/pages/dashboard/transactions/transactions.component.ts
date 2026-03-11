import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankService } from '../../../services/bank.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  loading = false;
  searchTerm = '';
  selectedCategory = 'All';

  categories = ['All', 'Food & Dining', 'Shopping', 'Salary Credit', 'Utilities', 'Entertainment', 'Uncategorized'];

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
          this.applyFilters();
        }
      },
      error: () => {
        this.loading = false;
        // Mock data for display if API fails or is empty for visual demo
        if (this.transactions.length === 0) {
          this.generateMockTransactions();
        }
      }
    });
  }

  generateMockTransactions() {
    this.transactions = [
      { description: 'Starbucks Coffee', amount: 450, transaction_type: 'DEBIT', category: 'Food & Dining', transaction_date: new Date(), status: 'COMPLETED', bank_account_id: { bank_name: 'HDFC Bank' } },
      { description: 'Salary Deposit', amount: 85000, transaction_type: 'CREDIT', category: 'Salary Credit', transaction_date: new Date(Date.now() - 86400000), status: 'COMPLETED', bank_account_id: { bank_name: 'ICICI Bank' } },
      { description: 'Amazon Shopping', amount: 2499, transaction_type: 'DEBIT', category: 'Shopping', transaction_date: new Date(Date.now() - 172800000), status: 'COMPLETED', bank_account_id: { bank_name: 'HDFC Bank' } },
      { description: 'Electricity Bill', amount: 3200, transaction_type: 'DEBIT', category: 'Utilities', transaction_date: new Date(Date.now() - 259200000), status: 'PENDING', bank_account_id: { bank_name: 'SBI Bank' } },
      { description: 'Netflix Subscription', amount: 499, transaction_type: 'DEBIT', category: 'Entertainment', transaction_date: new Date(Date.now() - 432000000), status: 'COMPLETED', bank_account_id: { bank_name: 'HDFC Bank' } }
    ];
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredTransactions = this.transactions.filter(tx => {
      const matchesSearch = tx.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           tx.bank_account_id?.bank_name?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'All' || tx.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
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

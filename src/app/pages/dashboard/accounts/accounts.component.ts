import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankService } from '../../../services/bank.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit {
  accounts: any[] = [];
  loading = false;
  showConsentModal = false;
  pollingConsentId: string | null = null;
  consentUrl: string | null = null;

  // Form data for consent creation
  mobileNumber = '';

  constructor(private bankService: BankService) { }

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.loading = true;
    this.bankService.getLinkedAccounts().subscribe({
      next: (res: any) => {
        this.loading = false;
        if (!res.error) {
          this.accounts = res.result;
        }
      },
      error: () => this.loading = false
    });
  }

  openConsentModal() {
    this.showConsentModal = true;
    this.mobileNumber = '';
    this.consentUrl = null;
  }

  closeConsentModal() {
    this.showConsentModal = false;
    this.mobileNumber = '';
    this.consentUrl = null;
    this.pollingConsentId = null;
  }

  /**
   * Step 1: Create Consent via Setu AA
   * Opens the consent approval URL in a new tab
   */
  onCreateConsent() {
    if (!this.mobileNumber || this.mobileNumber.length < 10) return;

    this.loading = true;
    this.bankService.createConsent(this.mobileNumber).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (!res.error && res.result) {
          this.consentUrl = res.result.consent_url;
          this.pollingConsentId = res.result.consent_id;

          // Open consent approval in new tab
          if (this.consentUrl) {
            window.open(this.consentUrl, '_blank');
          }
        }
      },
      error: (err) => {
        this.loading = false;
        alert('Failed to connect: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }

  /**
   * Step 2: Check if consent has been approved
   */
  checkConsentStatus() {
    if (!this.pollingConsentId) return;

    this.loading = true;
    this.bankService.getConsentStatus(this.pollingConsentId).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (!res.error && res.result) {
          const status = res.result.status;
          if (status === 'ACTIVE') {
            alert('✅ Consent approved! Your account has been linked successfully.');
            this.closeConsentModal();
            this.loadAccounts();
          } else if (status === 'REJECTED' || status === 'REVOKED') {
            alert('❌ Consent was ' + status.toLowerCase() + '. Please try again.');
            this.closeConsentModal();
          } else {
            alert('⏳ Consent is still pending. Please complete the approval process.');
          }
        }
      },
      error: () => this.loading = false
    });
  }

  syncAccount(accountId: string) {
    this.bankService.syncTransactions(accountId).subscribe({
      next: (res: any) => {
        if (!res.error) {
          alert(`✅ Synced ${res.result?.synced_count || 0} new transactions!`);
          this.loadAccounts(); // Refresh to show updated balance
        }
      }
    });
  }

  revokeAccount(accountId: string) {
    if (!confirm('Are you sure you want to revoke this account? This will deactivate it.')) return;

    this.bankService.revokeAccount(accountId).subscribe({
      next: (res: any) => {
        if (!res.error) {
          alert('Account consent revoked successfully.');
          this.loadAccounts();
        }
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE': return 'active';
      case 'PENDING': return 'pending';
      case 'REJECTED':
      case 'REVOKED':
      case 'EXPIRED': return 'inactive';
      default: return '';
    }
  }
}

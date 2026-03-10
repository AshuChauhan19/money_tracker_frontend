import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs = [
    {
      question: 'How secure is my financial data?',
      answer: 'We use bank-level 256-bit encryption to secure your data. We only have read-only access to your accounts, meaning we cannot move your money. Your peace of mind is our top priority.',
      isOpen: false
    },
    {
      question: 'Which banks do you support?',
      answer: 'We support over 10,000 financial institutions globally, including major banks, credit unions, and investment brokers. If your bank has an online portal, chances are we support it.',
      isOpen: false
    },
    {
      question: 'How does the UPI tracking work?',
      answer: 'By simply verifying your phone number linked to your UPI ID, we securely fetch your transaction history directly from your bank to automatically categorize your daily expenses.',
      isOpen: false
    },
    {
      question: 'Is there a free version available?',
      answer: 'Yes! Our core features—like dashboard overview and basic budgeting—will always be free. We offer premium plans for advanced analytics, receipt scanning, and priority support.',
      isOpen: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}

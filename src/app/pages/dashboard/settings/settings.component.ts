import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/100?img=12',
    plan: 'Professional Plan'
  };

  settingsSections = [
    { title: 'Personal Information', description: 'Update your name, email and avatar' },
    { title: 'Security', description: 'Change password and 2FA settings' },
    { title: 'Notifications', description: 'Management email and push alerts' },
    { title: 'Billing', description: 'Manage your subscription and invoices' }
  ];
}

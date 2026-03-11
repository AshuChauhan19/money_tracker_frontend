import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  user: any = {
    name: '',
    email: '',
    avatar: 'https://i.pravatar.cc/100?img=12',
    plan: 'Professional Plan'
  };

  // Modals state
  showProfileModal = false;
  showSecurityModal = false;
  
  loading = false;

  // Form Models
  profileForm = {
    name: '',
    email: ''
  };

  securityForm = {
    current_password: '',
    new_password: '',
    confirm_password: ''
  };

  constructor(private auth: AuthService, private toast: ToastService) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const userData = this.auth.getUser();
    if (userData) {
      this.user = {
        ...this.user,
        ...userData
      };
      this.profileForm.name = this.user.name;
      this.profileForm.email = this.user.email;
    }
  }

  openProfileModal() {
    this.profileForm.name = this.user.name;
    this.profileForm.email = this.user.email;
    this.showProfileModal = true;
  }

  openSecurityModal() {
    this.securityForm = {
      current_password: '',
      new_password: '',
      confirm_password: ''
    };
    this.showSecurityModal = true;
  }

  closeModals() {
    this.showProfileModal = false;
    this.showSecurityModal = false;
  }

  updateProfile() {
    this.loading = true;
    this.auth.updateProfile(this.profileForm).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (!res.error) {
          this.toast.success("Profile updated successfully!");
          this.loadUserData();
          setTimeout(() => this.closeModals(), 800);
        } else {
          this.toast.error(res.message);
        }
      },
      error: (err) => {
        this.loading = false;
        console.error("Profile Update Error:", err);
        this.toast.error(err.error?.message || "Failed to update profile");
      }
    });
  }

  changePassword() {
    if (this.securityForm.new_password !== this.securityForm.confirm_password) {
      this.toast.error("Passwords do not match");
      return;
    }

    this.loading = true;
    this.auth.changePassword({
      current_password: this.securityForm.current_password,
      new_password: this.securityForm.new_password
    }).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (!res.error) {
          this.toast.success("Password changed successfully!");
          setTimeout(() => this.closeModals(), 800);
        } else {
          this.toast.error(res.message);
        }
      },
      error: (err) => {
        this.loading = false;
        console.error("Password Change Error:", err);
        this.toast.error(err.error?.message || "Failed to change password");
      }
    });
  }
}

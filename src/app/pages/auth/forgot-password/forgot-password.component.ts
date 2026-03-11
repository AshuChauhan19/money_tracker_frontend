import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  step: 'email' | 'otp' | 'reset' = 'email';
  loading = false;
  showPassword = false;

  formData = {
    email: '',
    newPassword: '',
    confirmPassword: '',
    resetToken: ''
  };

  otpDigits: string[] = ['', '', '', ''];

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) { }

  get isOtpComplete(): boolean {
    return this.otpDigits.every(digit => digit !== '' && digit !== null);
  }

  trackByIndex(index: number): number {
    return index;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSendOtp() {
    if (!this.formData.email) return;

    this.loading = true;
    this.auth.resendOtp(this.formData.email).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (!res.error) {
          this.step = 'otp';
          this.otpDigits = ['', '', '', '']; // Reset for fresh start
          this.toast.info("OTP sent to your email");
          setTimeout(() => {
            const firstInput = document.getElementById('otp-0') as HTMLInputElement;
            if (firstInput) firstInput.focus();
          }, 100);
        } else {
          this.toast.error(res.message);
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.toast.error(err.error?.message || "Failed to send OTP");
      }
    });
  }

  onVerifyOtp() {
    if (!this.isOtpComplete) return;

    this.loading = true;
    this.auth.verifyResetOtp({
      email: this.formData.email,
      otp: this.otpDigits.join('')
    }).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (!res.error) {
          this.formData.resetToken = res.result.reset_token;
          this.step = 'reset';
          this.toast.success("Identity verified!");
        } else {
          this.toast.error(res.message);
        }
      },
      error: (err: any) => {
        this.loading = false;
        console.error("OTP Verification Error:", err);
        this.toast.error(err.error?.message || "Invalid OTP code");
      }
    });
  }

  onOtpInput(event: any, index: number) {
    const input = event.target;
    let value = input.value;

    if (value.length > 1) {
      value = value.charAt(value.length - 1);
    }

    if (!/^\d$/.test(value)) {
      this.otpDigits[index] = '';
      input.value = '';
      return;
    }

    this.otpDigits[index] = value;
    input.value = value;

    if (value !== '' && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (!this.otpDigits[index] && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
          this.otpDigits[index - 1] = '';
        }
      } else {
        this.otpDigits[index] = '';
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData?.getData('text') || '';
    const digits = pastedText.replace(/\D/g, '').substring(0, 4);

    if (digits.length > 0) {
      for (let i = 0; i < digits.length; i++) {
        if (i < 4) {
          this.otpDigits[i] = digits[i];
          const inputElement = document.getElementById(`otp-${i}`) as HTMLInputElement;
          if (inputElement) inputElement.value = digits[i];
        }
      }
      const nextFocusIndex = Math.min(digits.length, 3);
      const nextInput = document.getElementById(`otp-${nextFocusIndex}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }

  onResetPassword() {
    if (this.formData.newPassword !== this.formData.confirmPassword) {
      this.toast.error("Passwords do not match");
      return;
    }

    this.loading = true;
    this.auth.resetPassword({
      email: this.formData.email,
      reset_token: this.formData.resetToken,
      new_password: this.formData.newPassword
    }).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (!res.error) {
          this.toast.success("Password reset successful! Please login.");
          this.router.navigate(['/login']);
        } else {
          this.toast.error(res.message);
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.toast.error(err.error?.message || "Failed to reset password");
      }
    });
  }

  goBack() {
    if (this.step === 'otp') this.step = 'email';
    else if (this.step === 'reset') this.step = 'otp';
  }
}

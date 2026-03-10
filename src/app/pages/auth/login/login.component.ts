import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    step: 'credentials' | 'otp' = 'credentials';
    showPassword = false;
    loading = false;
    error: string | null = null;

    // Form fields
    credentials = {
        email: '',
        password: ''
    };

    // Initialize with empty strings
    otpDigits: string[] = ['', '', '', ''];

    constructor(private auth: AuthService, private router: Router) { }

    get isOtpComplete(): boolean {
        return this.otpDigits.every(digit => digit !== '' && digit !== null);
    }

    trackByIndex(index: number): number {
        return index;
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    onLoginSubmit() {
        if (!this.credentials.email || !this.credentials.password) return;

        this.loading = true;
        this.error = null;

        this.auth.signin(this.credentials).subscribe({
            next: (res: any) => {
                this.loading = false;
                if (!res.error) {
                    this.step = 'otp';
                    // Clear previous state for a fresh login
                    this.otpDigits = ['', '', '', ''];
                    setTimeout(() => {
                        const firstInput = document.getElementById('otp-0') as HTMLInputElement;
                        if (firstInput) firstInput.focus();
                    }, 100);
                } else {
                    this.error = res.message;
                }
            },
            error: (err: any) => {
                this.loading = false;
                this.error = err.error?.message || 'Login failed. Please try again.';
            }
        });
    }

    onOtpInput(event: any, index: number) {
        const input = event.target;
        let value = input.value;

        // Keep only last char
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

        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
            if (nextInput) nextInput.focus();
        }

        if (this.isOtpComplete) {
            this.onVerifySubmit();
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

            if (this.isOtpComplete) {
                this.onVerifySubmit();
            }
        }
    }

    onVerifySubmit() {
        if (!this.isOtpComplete) return;

        const otpValue = this.otpDigits.join('');
        this.loading = true;
        this.error = null;

        this.auth.verifyOtp({
            email: this.credentials.email,
            otp: otpValue
        }).subscribe({
            next: (res: any) => {
                this.loading = false;
                if (!res.error) {
                    this.auth.setSession(res.result);
                    this.router.navigate(['/dashboard']);
                } else {
                    this.error = res.message;
                }
            },
            error: (err: any) => {
                this.loading = false;
                this.error = err.error?.message || 'Verification failed.';
            }
        });
    }

    resendOtp() {
        this.auth.resendOtp(this.credentials.email).subscribe();
    }

    goBack() {
        this.step = 'credentials';
        this.error = null;
        this.otpDigits = ['', '', '', ''];
    }
}

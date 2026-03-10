import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @desc    Service for all User Authentication and Verification
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) { }

  /**
   * @desc    Initial step for registration (receives OTP)
   */
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  /**
   * @desc    Initial step for signin (receives OTP if credentials valid)
   */
  signin(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }

  /**
   * @desc    Final step for Login/Registration to obtain Bearer token
   */
  verifyOtp(data: { email: string; otp: string; fcm_token?: string; device_type?: number }): Observable<any> {
    // Injecting dummy fcm_token as requested for now
    if (!data.fcm_token) {
      data.fcm_token = 'dummy_fcm_token_123456';
    }
    if (!data.device_type) {
      data.device_type = 3; // Web
    }
    return this.http.post(`${this.apiUrl}/verify-otp`, data);
  }

  /**
   * @desc    Trigger a fresh OTP for recovery or validation
   */
  resendOtp(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, { email });
  }

  /**
   * @desc    Log the user out from current session
   */
  signout(fcm_token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signout`, { fcm_token });
  }

  /**
   * @desc    Securely store and retrieve authentication state
   */
  setSession(authResult: any): void {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', JSON.stringify(authResult.user));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

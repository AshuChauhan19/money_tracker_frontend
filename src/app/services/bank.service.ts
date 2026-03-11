import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BankService {
    private apiUrl = 'http://localhost:5000/api/bank';

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): { headers: HttpHeaders } {
        const token = localStorage.getItem('token');
        
        return {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };
    }

    /**
     * @desc Create a consent request via Setu AA
     *       Returns a consent_url to redirect the user for approval
     */
    createConsent(mobileNumber: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/consent/create`, {
            mobile_number: mobileNumber
        }, this.getAuthHeaders());
    }

    /**
     * @desc Check the status of a consent request
     */
    getConsentStatus(consentId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/consent/status/${consentId}`, this.getAuthHeaders());
    }

    /**
     * @desc Get all connected bank accounts
     */
    getLinkedAccounts(): Observable<any> {
        return this.http.get(`${this.apiUrl}/linked-accounts`, this.getAuthHeaders());
    }

    /**
     * @desc Sync transactions from Setu AA for a specific account
     */
    syncTransactions(accountId: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/sync/${accountId}`, {}, this.getAuthHeaders());
    }

    /**
     * @desc Get all transactions across all accounts
     */
    getTransactions(): Observable<any> {
        return this.http.get(`${this.apiUrl}/transactions`, this.getAuthHeaders());
    }

    /**
     * @desc Revoke consent and deactivate an account
     */
    revokeAccount(accountId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/revoke/${accountId}`, this.getAuthHeaders());
    }
}

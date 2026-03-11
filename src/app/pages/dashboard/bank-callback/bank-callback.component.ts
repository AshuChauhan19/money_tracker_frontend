import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bank-callback',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bank-callback.component.html',
  styleUrl: './bank-callback.component.scss'
})
export class BankCallbackComponent implements OnInit {

  status: 'loading' | 'success' | 'checking' | 'error' = 'checking';
  
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Read the query parameters Setu sends back to the Redirect URL
    // Typically Setu might append ?status=ACTIVE or similar
    this.route.queryParams.subscribe(params => {
       const consentStatus = params['status'] || params['state']; 
       
       if (consentStatus === 'ACTIVE' || consentStatus === 'success') {
           this.status = 'success';
       } else if (consentStatus === 'REJECTED' || consentStatus === 'error') {
           this.status = 'error';
       } else {
           // Default fallback: display success processing state 
           // and redirect user back to accounts page after 3 seconds
           this.status = 'success';
           setTimeout(() => {
                this.router.navigate(['/dashboard/accounts']);
           }, 3000);
       }
    });
  }

}

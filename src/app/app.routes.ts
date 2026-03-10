import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { FaqComponent } from './pages/public/faq/faq.component';
import { ContactUsComponent } from './pages/public/contact-us/contact-us.component';
import { SubscriptionsComponent } from './pages/public/subscriptions/subscriptions.component';
import { PrivacyPolicyComponent } from './pages/public/privacy-policy/privacy-policy.component';
import { TermsComponent } from './pages/public/terms/terms.component';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'faq', component: FaqComponent },
            { path: 'contact', component: ContactUsComponent },
            { path: 'subscriptions', component: SubscriptionsComponent },
            { path: 'privacy-policy', component: PrivacyPolicyComponent },
            { path: 'terms', component: TermsComponent }
        ]
    }
];

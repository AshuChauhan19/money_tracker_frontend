import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { FaqComponent } from './pages/public/faq/faq.component';
import { ContactUsComponent } from './pages/public/contact-us/contact-us.component';
import { SubscriptionsComponent } from './pages/public/subscriptions/subscriptions.component';
import { PrivacyPolicyComponent } from './pages/public/privacy-policy/privacy-policy.component';
import { TermsComponent } from './pages/public/terms/terms.component';

import { authGuard, guestGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { PlansComponent } from './pages/auth/plans/plans.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountsComponent } from './pages/dashboard/accounts/accounts.component';
import { TransactionsComponent } from './pages/dashboard/transactions/transactions.component';
import { BudgetsComponent } from './pages/dashboard/budgets/budgets.component';
import { InvestmentsComponent } from './pages/dashboard/investments/investments.component';
import { SettingsComponent } from './pages/dashboard/settings/settings.component';
import { BankCallbackComponent } from './pages/dashboard/bank-callback/bank-callback.component';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        canActivate: [guestGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'faq', component: FaqComponent },
            { path: 'contact', component: ContactUsComponent },
            { path: 'subscriptions', component: SubscriptionsComponent },
            { path: 'privacy-policy', component: PrivacyPolicyComponent },
            { path: 'terms', component: TermsComponent }
        ]
    },
    { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [guestGuard] },
    { path: 'auth/plans', component: PlansComponent, canActivate: [authGuard] },
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'accounts', component: AccountsComponent },
            { path: 'transactions', component: TransactionsComponent },
            { path: 'budgets', component: BudgetsComponent },
            { path: 'investments', component: InvestmentsComponent },
            { path: 'settings', component: SettingsComponent },
            { path: 'bank-callback', component: BankCallbackComponent }
        ]
    }
];

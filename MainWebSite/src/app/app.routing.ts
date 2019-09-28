import { Routes, RouterModule } from '@angular/router';
import { MasterPageComponent } from './Views/admin/master-page/master-page.component';
import { MasterLoginComponent } from './Views/admin/master-login/master-login.component';
import { DefaultComponent } from './Views/admin/default/default.component';
import { LoginComponent } from './Views/admin/login/login.component';
import { ChangePasswordComponent } from './Views/admin/change-password/change-password.component';
import { GenerateKeyComponent } from './Views/admin/generate-key/generate-key.component';
import { DevsComponent } from './Views/admin/devs/devs.component';
import { FunctionsFeaturesComponent } from './Views/admin/components/pages-default/functions-features/functions-features.component';
import { ManualsComponent } from './Views/admin/components/pages-default/manuals/manuals.component';
import { DemoComponent } from './Views/admin/components/pages-default/demo/demo.component';
import { GuideComponent } from './Views/admin/components/pages-default/guide/guide.component';
import { TimetableOfficesComponent } from './Views/admin/components/pages-default/timetable-offices/timetable-offices.component';
import { FaqComponent } from './Views/admin/components/pages-default/faq/faq.component';
import { NewsComponent } from './Views/admin/components/pages-default/news/news.component';
import { ContactComponent } from './Views/admin/components/pages-default/contact/contact.component';

import { AuthGuard } from './Directives/auth.guard';

const appRoutes: Routes = [
    {
        path: 'login', component: MasterLoginComponent,
        children: [
            { path: '', component: LoginComponent },
            { path: 'changePassword', component: ChangePasswordComponent },
            { path: 'generateKey', component: GenerateKeyComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'demo', component: DemoComponent },
            { path: 'faq', component: FaqComponent },
            { path: 'functions-features', component: FunctionsFeaturesComponent },
            { path: 'guide', component: GuideComponent },
            { path: 'manuals', component: ManualsComponent },
            { path: 'news', component: NewsComponent },
            { path: 'timetable-offices', component: TimetableOfficesComponent },
        ]
    },
    {
        path: '', component: MasterPageComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: DefaultComponent },
            { path: 'devs', component: DevsComponent },
            { path: 'transfers', loadChildren: './Views/transfers/transfers.module#TransfersModule' },
            { path: 'queries', loadChildren: './Views/queries/queries.module#QueriesModule' },
            { path: 'massPayments', loadChildren: './Views/mass-payments/mass-payments.module#MassPaymentsModule' },
            { path: 'service-payments', loadChildren: './Views/service-payments/service-payments.module#ServicePaymentsModule' },
            { path: 'operations', loadChildren: './Views/operations/operations.module#OperationsModule' },
            { path: 'vouchers', loadChildren: './Views/vouchers/vouchers.module#VouchersModule' },
            { path: 'credits', loadChildren: './Views/credits/credits.module#CreditsModule' },

        ]
    }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });

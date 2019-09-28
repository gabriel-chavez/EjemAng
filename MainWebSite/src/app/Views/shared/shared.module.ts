import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ShowErrorsComponent } from './components/show-errors/show-errors.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MyDatePickerModule } from 'mydatepicker';
import { NumberPadComponent } from './components/number-pad/number-pad.component';
import { TokenComponent } from './components/token/token.component';
import { TokenModalComponent } from './components/token-modal/token-modal.component';
import { DirectivesModule } from '../../Directives/directives.module';
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { EmailsInputComponent } from './components/emails-input/emails-input.component';
import { DateFutureComponent } from './components/date-future/date-future.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { ApproversAndControllersComponent } from './components/approvers-and-controllers/approvers-and-controllers.component';
import { CurrencyAndAmountComponent } from './components/currency-and-amount/currency-and-amount.component';
import { CurrencyFlagComponent } from './components/currency-flag/currency-flag.component';
import { MyAccountsComponent } from './components/my-accounts/my-accounts.component';
import { SourceAccountsComponent } from './components/source-accounts/source-accounts.component';
import { CompanyLimitsComponent } from './components/company-limits/company-limits.component';
import { SaveFavoritesComponent } from './components/save-favorites/save-favorites.component';
import { CompanyNameComponent } from './components/company-name/company-name.component';
import { ListOfMonthsComponent } from './components/list-of-months/list-of-months.component';
import { PasswordValidationComponent } from './components/password-validation/password-validation.component';
import { RequesterFormAbroadComponent } from './components/requester-form-abroad/requester-form-abroad.component';
import { BeneficiaryFormAbroadComponent } from './components/beneficiary-form-abroad/beneficiary-form-abroad.component';
import { IntermediaryBankFormAbroadComponent } from './components/intermediary-bank-form-abroad/intermediary-bank-form-abroad.component';
import { BanksSearcherComponent } from './components/banks-searcher/banks-searcher.component';
import { TransferCategoriesAsfiComponent } from './components/transfer-categories-asfi/transfer-categories-asfi.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { ShowWithoutDataComponent } from './components/show-without-data/show-without-data.component';
import { InformationPanelComponent } from './components/information-panel/information-panel.component';
import { GlossaryTermsComponent } from './components/glossary-terms/glossary-terms.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MyDatePickerModule,
    DirectivesModule,
  ],
  declarations: [
    ShowErrorsComponent,
    LoaderComponent,
    CaptchaComponent,
    ModalComponent,
    PaginationComponent,
    NumberPadComponent,
    TokenComponent,
    TokenModalComponent,
    TagInputComponent,
    EmailsInputComponent,
    DateFutureComponent,
    TicketComponent,
    ApproversAndControllersComponent,
    CurrencyAndAmountComponent,
    CurrencyFlagComponent,
    MyAccountsComponent,
    SourceAccountsComponent,
    CompanyLimitsComponent,
    SaveFavoritesComponent,
    CompanyNameComponent,
    ListOfMonthsComponent,
    PasswordValidationComponent,
    RequesterFormAbroadComponent,
    BeneficiaryFormAbroadComponent,
    IntermediaryBankFormAbroadComponent,
    BanksSearcherComponent,
    TransferCategoriesAsfiComponent,
    DateRangePickerComponent,
    InformationPanelComponent,
    ShowWithoutDataComponent,
    GlossaryTermsComponent
  ],
  exports: [
    ShowErrorsComponent,
    LoaderComponent,
    CaptchaComponent,
    ModalComponent,
    PaginationComponent,
    MyDatePickerModule,
    NumberPadComponent,
    TokenComponent,
    TokenModalComponent,
    DirectivesModule,
    TagInputComponent,
    EmailsInputComponent,
    DateFutureComponent,
    TicketComponent,
    ApproversAndControllersComponent,
    CurrencyAndAmountComponent,
    CurrencyFlagComponent,
    MyAccountsComponent,
    SourceAccountsComponent,
    CompanyLimitsComponent,
    SaveFavoritesComponent,
    CompanyNameComponent,
    ListOfMonthsComponent,
    RequesterFormAbroadComponent,
    BeneficiaryFormAbroadComponent,
    IntermediaryBankFormAbroadComponent,
    BanksSearcherComponent,
    TransferCategoriesAsfiComponent,
    DateRangePickerComponent,
    ShowWithoutDataComponent,
    InformationPanelComponent,
    GlossaryTermsComponent
  ]
})
export class SharedModule {
}

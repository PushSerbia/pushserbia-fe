import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DonationOption,
  donationOptions,
} from '../../../../core/donation/donation-option';
import { catchError, of, Subscription, tap } from 'rxjs';
import { IntegrationsService } from '../../../../core/integrations/integrations.service';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css',
})
export class PaymentPageComponent implements OnInit, OnDestroy {
  paymentForm: FormGroup;
  isOneTime = true;
  amount = 0;
  title = '';
  donationOptions = donationOptions;
  selectedOption: DonationOption | null = null;
  showOptionsSelector = false;
  currentStep = 1; // Step 1: Collect data, Step 2: Display confirmation
  isSubmitting = false;
  submissionSuccess = false;
  submissionError: string | null = null;
  private queryParamsSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private integrationsService: IntegrationsService,
  ) {
    this.paymentForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      agreeTerms: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.isOneTime = params['isOneTime'] === 'true';
        this.amount = Number(params['amount']) || 0;
        this.title = params['title'] || '';

        this.selectedOption =
          this.donationOptions.find(
            (option) =>
              option.title === this.title &&
              option.price === this.amount &&
              option.isOneTime === this.isOneTime,
          ) || null;
      },
    );
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  toggleOptionsSelector(): void {
    this.showOptionsSelector = !this.showOptionsSelector;
  }

  selectOption(option: DonationOption): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        isOneTime: option.isOneTime,
        amount: option.price,
        title: option.title,
      },
      queryParamsHandling: 'merge',
    });
    this.showOptionsSelector = false;
  }

  onSubmit(): void {
    if (this.paymentForm.valid && this.currentStep === 1) {
      this.isSubmitting = true;
      this.submissionError = null;

      this.integrationsService
        .subscribeForPayment(
          this.paymentForm.value.email,
          this.paymentForm.value.fullName,
          JSON.stringify({
            amount: this.amount,
            title: this.title,
            isOneTime: this.isOneTime,
          }),
        )
        .pipe(
          tap(() => {
            this.isSubmitting = false;
            this.submissionSuccess = true;
            this.currentStep = 2; // Move to confirmation step
          }),
          catchError((error) => {
            this.isSubmitting = false;
            this.submissionError =
              'Došlo je do greške prilikom slanja podataka. Molimo pokušajte ponovo.';
            console.error('Integration subscription error:', error);
            return of(null); // Return an observable that emits null and completes
          }),
        )
        .subscribe();
    } else if (this.currentStep === 2) {
      this.router.navigate(['/']);
    } else {
      Object.keys(this.paymentForm.controls).forEach((key) => {
        const control = this.paymentForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}

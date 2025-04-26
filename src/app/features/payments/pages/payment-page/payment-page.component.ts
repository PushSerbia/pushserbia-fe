import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DonationOption, donationOptions } from '../../../../core/donation/donation-option';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css',
})
export class PaymentPageComponent implements OnInit {
  paymentForm: FormGroup;
  isOneTime: boolean = true;
  amount: number = 0;
  title: string = '';
  donationOptions = donationOptions;
  selectedOption: DonationOption | null = null;
  showOptionsSelector: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.paymentForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      agreeTerms: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isOneTime = params['isOneTime'] === 'true';
      this.amount = Number(params['amount']) || 0;
      this.title = params['title'] || '';

      this.selectedOption = this.donationOptions.find(
        option => option.title === this.title && 
                 option.price === this.amount && 
                 option.isOneTime === this.isOneTime
      ) || null;
    });
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
        title: option.title
      },
      queryParamsHandling: 'merge'
    });
    this.showOptionsSelector = false;
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log('Payment submitted', {
        ...this.paymentForm.value,
        amount: this.amount,
        isOneTime: this.isOneTime,
        title: this.title
      });

      alert('Plaćanje uspešno! Hvala na podršci.');
    } else {
      Object.keys(this.paymentForm.controls).forEach(key => {
        const control = this.paymentForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}

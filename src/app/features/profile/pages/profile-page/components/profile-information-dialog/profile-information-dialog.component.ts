import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-information-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-information-dialog.component.html',
  styleUrl: './profile-information-dialog.component.css',
})
export class ProfileInformationDialogComponent {
  private readonly formBuilder = inject(UntypedFormBuilder);
  readonly form = this.formBuilder.group({
    fullName: this.formBuilder.control(''),
    linkedInUrl:this.formBuilder.control(''),
    gitHubUrl: this.formBuilder.control('')
  });
}

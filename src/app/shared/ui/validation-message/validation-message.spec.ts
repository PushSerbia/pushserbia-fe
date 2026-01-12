import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationMessage } from './validation-message';

describe('ValidationMessage', () => {
  let component: ValidationMessage;
  let fixture: ComponentFixture<ValidationMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidationMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

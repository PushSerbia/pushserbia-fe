import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationMessage } from './validation-message';

describe('ValidationMessage', () => {
  let component: ValidationMessage;
  let fixture: ComponentFixture<ValidationMessage>;

  // Create a mock FieldTree that mimics the signal-of-signal pattern
  const mockControl = () => ({
    valid: () => true,
    dirty: () => false,
    touched: () => false,
    errors: () => null,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidationMessage);
    component = fixture.componentInstance;
    const componentRef = fixture.componentRef;
    componentRef.setInput('control', mockControl);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

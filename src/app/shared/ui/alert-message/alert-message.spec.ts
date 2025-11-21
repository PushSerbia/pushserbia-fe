import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMessage } from './alert-message';

describe('AlertMessage', () => {
  let component: AlertMessage;
  let fixture: ComponentFixture<AlertMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

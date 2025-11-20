import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWidget } from './user-widget';

describe('UserWidget', () => {
  let component: UserWidget;
  let fixture: ComponentFixture<UserWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(UserWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

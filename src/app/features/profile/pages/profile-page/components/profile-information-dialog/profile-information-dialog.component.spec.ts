import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInformationDialogComponent } from './profile-information-dialog.component';

describe('ProfileInformationDialogComponent', () => {
  let component: ProfileInformationDialogComponent;
  let fixture: ComponentFixture<ProfileInformationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileInformationDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

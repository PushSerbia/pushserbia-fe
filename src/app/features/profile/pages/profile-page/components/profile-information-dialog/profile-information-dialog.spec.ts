import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInformationDialog } from './profile-information-dialog';

describe('ProfileInformationDialog', () => {
  let component: ProfileInformationDialog;
  let fixture: ComponentFixture<ProfileInformationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileInformationDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileInformationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

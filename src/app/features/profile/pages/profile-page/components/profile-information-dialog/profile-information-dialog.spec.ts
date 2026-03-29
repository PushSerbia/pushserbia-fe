import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileInformationDialog } from './profile-information-dialog';
import { AuthClient } from '../../../../../../core/auth/auth-client';
import { ComponentRef } from '@angular/core';
import { of } from 'rxjs';

describe('ProfileInformationDialog', () => {
  let component: ProfileInformationDialog;
  let componentRef: ComponentRef<ProfileInformationDialog>;
  let fixture: ComponentFixture<ProfileInformationDialog>;
  let mockAuthClient: jasmine.SpyObj<AuthClient>;

  beforeEach(async () => {
    mockAuthClient = jasmine.createSpyObj('AuthClient', ['updateMe'], {
      $fullUserData: jasmine.createSpy().and.returnValue({
        fullName: 'Test User',
        linkedInUrl: 'https://linkedin.com/in/test',
        gitHubUrl: 'https://github.com/test',
      }),
    });

    await TestBed.configureTestingModule({
      imports: [ProfileInformationDialog],
      providers: [{ provide: AuthClient, useValue: mockAuthClient }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileInformationDialog);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', 'test-dialog');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with user data', () => {
    expect(component.form.value.fullName).toBe('Test User');
    expect(component.form.value.linkedInUrl).toBe('https://linkedin.com/in/test');
    expect(component.form.value.gitHubUrl).toBe('https://github.com/test');
  });

  it('should require fullName', () => {
    component.form.controls.fullName.setValue('');
    expect(component.form.controls.fullName.valid).toBeFalse();
  });

  it('should not require linkedInUrl', () => {
    component.form.controls.linkedInUrl.setValue('');
    expect(component.form.controls.linkedInUrl.valid).toBeTrue();
  });

  it('should call authService.updateMe on updateMe()', () => {
    mockAuthClient.updateMe.and.returnValue(of({} as any));
    spyOn(component.closeClick, 'emit');

    component.updateMe();

    expect(mockAuthClient.updateMe).toHaveBeenCalledWith({
      fullName: 'Test User',
      linkedInUrl: 'https://linkedin.com/in/test',
      gitHubUrl: 'https://github.com/test',
    });
    expect(component.closeClick.emit).toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { BasicLayout } from './basic-layout';
import { AuthService } from '../../../core/auth/auth.service';

describe('LandingLayoutComponent', () => {
  let component: BasicLayout;
  let fixture: ComponentFixture<BasicLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicLayout],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['signOut'], {
            $authenticated: jasmine.createSpy().and.returnValue(false),
            $userData: jasmine.createSpy().and.returnValue(undefined),
            $fullUserData: jasmine.createSpy().and.returnValue(null),
          }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

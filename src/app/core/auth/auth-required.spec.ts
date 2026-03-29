import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthRequired } from './auth-required';
import { AuthClient } from './auth-client';

@Component({
  template: `
    <button appAuthRequired>Protected Button</button>
  `,
})
class TestComponent {}

describe('AuthRequired Directive', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let buttonElement: DebugElement;
  let mockAuthClient: jasmine.SpyObj<AuthClient>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthClient = jasmine.createSpyObj('AuthClient', [], {
      $authenticated: jasmine.createSpy().and.returnValue(false),
    });

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRouter.navigate.and.returnValue(Promise.resolve(true));

    TestBed.configureTestingModule({
      declarations: [TestComponent, AuthRequired],
      providers: [
        { provide: AuthClient, useValue: mockAuthClient },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.directive(AuthRequired));
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    expect(buttonElement).toBeTruthy();
  });

  it('should block click and redirect when user is not authenticated', () => {
    (mockAuthClient.$authenticated as jasmine.Spy).and.returnValue(false);
    const event = new MouseEvent('click');
    spyOn(event, 'preventDefault');
    spyOn(event, 'stopPropagation');

    buttonElement.nativeElement.dispatchEvent(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/autentikacija/prijava']);
  });

  it('should allow click to pass through when user is authenticated', () => {
    (mockAuthClient.$authenticated as jasmine.Spy).and.returnValue(true);
    const event = new MouseEvent('click');
    spyOn(event, 'preventDefault');
    spyOn(event, 'stopPropagation');

    buttonElement.nativeElement.dispatchEvent(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(event.stopPropagation).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to login page when click is blocked', () => {
    (mockAuthClient.$authenticated as jasmine.Spy).and.returnValue(false);
    const event = new MouseEvent('click');

    buttonElement.nativeElement.dispatchEvent(event);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/autentikacija/prijava']);
  });

  it('should not navigate when user is authenticated', () => {
    (mockAuthClient.$authenticated as jasmine.Spy).and.returnValue(true);
    const event = new MouseEvent('click');

    buttonElement.nativeElement.dispatchEvent(event);

    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should handle multiple clicks correctly', () => {
    (mockAuthClient.$authenticated as jasmine.Spy).and.returnValue(false);

    buttonElement.nativeElement.dispatchEvent(new MouseEvent('click'));
    buttonElement.nativeElement.dispatchEvent(new MouseEvent('click'));

    expect(mockRouter.navigate).toHaveBeenCalledTimes(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/autentikacija/prijava']);
  });
});

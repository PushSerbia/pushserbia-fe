import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RESPONSE_INIT } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NotFound } from './not-found';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set response status to 404 when RESPONSE_INIT is provided', () => {
    const mockResponse = { status: 200 };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [
        provideRouter([]),
        { provide: RESPONSE_INIT, useValue: mockResponse },
      ],
    });

    fixture = TestBed.createComponent(NotFound);
    expect(mockResponse.status).toBe(404);
  });
});

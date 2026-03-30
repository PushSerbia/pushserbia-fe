import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';

import { FinancingDetails } from './financing-details';
import { SeoManager } from '../../../../core/seo/seo-manager';

describe('FinancingDetails', () => {
  let component: FinancingDetails;
  let fixture: ComponentFixture<FinancingDetails>;
  let seoManagerMock: SeoManager;

  beforeEach(async () => {
    seoManagerMock = {
      update: vi.fn(),
    } as unknown as SeoManager;

    await TestBed.configureTestingModule({
      imports: [FinancingDetails],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SeoManager, useValue: seoManagerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancingDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update SEO metadata on initialization', () => {
    expect(seoManagerMock.update).toHaveBeenCalledWith({
      title: 'Podrži nas',
      description:
        'Podrži Push Serbia zajednicu — jednokratna donacija ili mesečna pretplata za razvoj open-source projekata.',
    });
  });
});

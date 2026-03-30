import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { ProjectCardNew } from './project-card-new';
import { AuthClient } from '../../../core/auth/auth-client';

describe('ProjectCardNew', () => {
  let component: ProjectCardNew;
  let fixture: ComponentFixture<ProjectCardNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardNew],
      providers: [
        provideRouter([]),
        {
          provide: AuthClient,
          useValue: {
            signOut: vi.fn(),
            $authenticated: vi.fn().mockReturnValue(false),
            $userData: vi.fn().mockReturnValue(undefined),
            $fullUserData: vi.fn().mockReturnValue(null),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

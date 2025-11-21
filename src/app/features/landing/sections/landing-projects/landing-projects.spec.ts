import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingProjects } from './landing-projects';

describe('LandingProjects', () => {
  let component: LandingProjects;
  let fixture: ComponentFixture<LandingProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingProjects],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

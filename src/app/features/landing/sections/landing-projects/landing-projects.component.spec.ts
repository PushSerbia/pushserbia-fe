import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingProjectsComponent } from './landing-projects.component';

describe('LandingProjectsComponent', () => {
  let component: LandingProjectsComponent;
  let fixture: ComponentFixture<LandingProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

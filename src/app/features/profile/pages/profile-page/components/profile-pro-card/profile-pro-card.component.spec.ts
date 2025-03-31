import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProCardComponent } from './profile-pro-card.component';

describe('ProfileProCardComponent', () => {
  let component: ProfileProCardComponent;
  let fixture: ComponentFixture<ProfileProCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileProCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileProCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

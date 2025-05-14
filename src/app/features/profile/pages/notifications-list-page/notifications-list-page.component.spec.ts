import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsListPageComponent } from './notifications-list-page.component';

describe('NotificationsListPageComponent', () => {
  let component: NotificationsListPageComponent;
  let fixture: ComponentFixture<NotificationsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsListPage } from './notifications-list-page';

describe('NotificationsListPage', () => {
  let component: NotificationsListPage;
  let fixture: ComponentFixture<NotificationsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

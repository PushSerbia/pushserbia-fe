import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLoader } from './page-loader';

describe('PageLoader', () => {
  let component: PageLoader;
  let fixture: ComponentFixture<PageLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(PageLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

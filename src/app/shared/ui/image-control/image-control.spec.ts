import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageControl } from './image-control';

describe('ImageControl', () => {
  let component: ImageControl;
  let fixture: ComponentFixture<ImageControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageControl],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

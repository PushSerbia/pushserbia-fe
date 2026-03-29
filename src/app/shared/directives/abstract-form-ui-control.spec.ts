import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AbstractFormUiControl } from './abstract-form-ui-control';

@Component({
  selector: 'app-test-form-control',
  template: '',
  standalone: true,
})
class TestFormUiControl extends AbstractFormUiControl<string> {}

describe('AbstractFormUiControl', () => {
  let component: TestFormUiControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFormUiControl],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestFormUiControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create instance', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize value model as null', () => {
    expect(component.value()).toBeNull();
  });

  it('should update value model when set', () => {
    component.value.set('test value');
    expect(component.value()).toBe('test value');
  });

  it('should initialize disabled model as false', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should update disabled model when set', () => {
    component.disabled.set(true);
    expect(component.disabled()).toBe(true);
  });

  it('should initialize readonly input as false', () => {
    expect(component.readonly()).toBe(false);
  });

  it('should initialize valid input as true', () => {
    expect(component.valid()).toBe(true);
  });

  it('should initialize errors input as empty array', () => {
    expect(component.errors()).toEqual([]);
  });

  it('should initialize touched model as false', () => {
    expect(component.touched()).toBe(false);
  });

  it('should update touched model when set', () => {
    component.touched.set(true);
    expect(component.touched()).toBe(true);
  });

  it('should initialize dirty input as false', () => {
    expect(component.dirty()).toBe(false);
  });
});

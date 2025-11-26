import { Directive, effect, input, model } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FormUiControl, ValidationError, WithOptionalField } from '@angular/forms/signals';

@Directive()
export abstract class AbstractControlValueAccessorDirective<T> implements ControlValueAccessor, FormUiControl {
  readonly value = model<T | null>(null);
  readonly disabled = model<boolean>(false);

  readonly readonly = input<boolean>(false);
  readonly valid = input<boolean>(true);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);
  readonly touched = model<boolean>(false);
  readonly dirty = input<boolean>(false);

  // Callback functions for ControlValueAccessor - initialized as no-ops and replaced by Angular Forms
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onChange: (value: T | null) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onTouched: () => void = () => {};

  readonly _valueChangeEffect = effect(() => {
      // Notify Angular forms of value changes
      this.onChange(this.value());
  });

  writeValue(value: T | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled.set(disabled);
  }
}

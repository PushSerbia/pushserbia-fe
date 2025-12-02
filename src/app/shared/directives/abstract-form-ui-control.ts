import { Directive, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';

@Directive()
export abstract class AbstractFormUiControl<T> implements FormValueControl<T | null> {
  readonly value = model<T | null>(null);
  readonly disabled = model<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly valid = input<boolean>(true);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);
  readonly touched = model<boolean>(false);
  readonly dirty = input<boolean>(false);
}

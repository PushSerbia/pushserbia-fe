import { Directive, input, model } from '@angular/core';
import { FormUiControl, ValidationError, WithOptionalField } from '@angular/forms/signals';

@Directive()
export abstract class AbstractFormUiControlDirective<T> implements FormUiControl {
  readonly value = model<T | null>(null);
  readonly disabled = model<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly valid = input<boolean>(true);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);
  readonly touched = model<boolean>(false);
  readonly dirty = input<boolean>(false);
}

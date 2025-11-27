import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';

@Component({
  selector: 'app-validation-message',
  imports: [],
  templateUrl: './validation-message.html',
  styleUrl: './validation-message.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessage {
  control = input.required<FieldTree<unknown>>();

  invisible = computed(() => {
    // FieldTree is a signal-like function returning FieldState.
    // Call it first to get the function,
    // then call that function to obtain the actual FieldState instance.
    // -> Weird I know, lol...
    const field = this.control()();

    return field.valid() || !(field.dirty() || field.touched());
  });

  firstErrorMessage = computed(() => this.control()().errors()?.[0]?.message || '');
}

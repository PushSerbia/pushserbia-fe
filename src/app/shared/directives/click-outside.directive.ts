import { Directive, ElementRef, inject, output, OnInit, DOCUMENT, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, map } from 'rxjs';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,

})
export class ClickOutsideDirective implements OnInit {
  readonly elementRef = inject(ElementRef<HTMLElement>);

  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly outsideClick = output<MouseEvent>();

  ngOnInit(): void {
    fromEvent(this.document, 'click')
      .pipe(
        map((event) => this.handleClick(event as MouseEvent)),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe()
  }

  handleClick(event: MouseEvent): void {
    event.stopPropagation();
    const clickedInside = this.elementRef.nativeElement.contains(event.target as Node);
    if (!clickedInside) {
      this.outsideClick.emit(event);
    }
  }
}

import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, filter, Subject } from 'rxjs';

@Directive({
  selector: '[observeVisibility]',
})
export class ObserveVisibilityDirective implements OnDestroy, AfterViewInit {
  private element = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  debounceTime = input(0);
  rootMargin = input(0);
  threshold = input(0);

  visible = output<boolean>();

  private observer: IntersectionObserver | undefined;
  private subject$ = new Subject<IntersectionObserverEntry | undefined>();

  ngAfterViewInit() {
    const options: IntersectionObserverInit = {
      rootMargin: this.rootMargin() + 'px',
      threshold: this.threshold(),
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.subject$.next(entry);
      });
    }, options);

    this.observer.observe(this.element.nativeElement);

    this.subject$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        delay(this.debounceTime()),
        filter((value) => value !== undefined)
      )
      .subscribe((entry) => {
        if (entry.isIntersecting) {
          this.visible.emit(true);
        } else {
          this.visible.emit(false);
        }
      });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}

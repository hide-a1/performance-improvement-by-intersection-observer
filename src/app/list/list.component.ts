import { Component, signal } from '@angular/core';
import { getNumbers } from '../data';
import { DetailComponent } from '../detail/detail.component';
import { ObserveVisibilityDirective } from '../observe-visibility.directive';

@Component({
  selector: 'app-list',
  imports: [DetailComponent, ObserveVisibilityDirective],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  numbers = getNumbers(100);

  visibleMap = signal<Map<number, boolean>>(new Map<number, boolean>());

  onVisible(value: number, visible: boolean) {
    this.visibleMap.update((map) => map.set(value, visible));
  }
}

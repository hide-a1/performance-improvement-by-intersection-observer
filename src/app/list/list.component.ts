import { afterNextRender, Component, signal } from '@angular/core';
import { getData } from '../data';
import { DetailComponent } from '../detail/detail.component';
import { ObserveVisibilityDirective } from '../observe-visibility.directive';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DetailComponent, ObserveVisibilityDirective],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  objects = getData(100);

  renderStart = signal<DOMHighResTimeStamp>(0);
  renderEnd = signal<DOMHighResTimeStamp>(0);
  renderTime = signal<DOMHighResTimeStamp>(0);

  constructor() {
    afterNextRender(() => {
      this.renderEnd.set(performance.now());
      this.renderTime.set(this.renderEnd() - this.renderStart());
    });
  }

  ngOnInit(): void {
    this.renderStart.set(performance.now());
  }

  onVisible(value: number) {
    console.log('visible' + value);
  }
}

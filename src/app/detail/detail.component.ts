import { Component, effect, input, viewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Data, getData } from '../data';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  data = input.required<Data>();
  visible = input.required<boolean>();
  accordion = viewChild.required(MatAccordion);

  detailData = getData(1000);

  constructor() {
    effect(() => {
      console.log(this.visible(), this.data().position);
    });
  }
}

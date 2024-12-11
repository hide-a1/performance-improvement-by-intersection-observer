import { Component, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { getNumbers } from '../data';

@Component({
  selector: 'app-detail',
  imports: [MatExpansionModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  index = input.required<number>();
  visible = input.required<boolean>();

  numbers = getNumbers(1000);
}

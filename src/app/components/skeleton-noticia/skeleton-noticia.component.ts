import { CommonModule } from '@angular/common';
import { Component, effect, input, OnInit, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-skeleton-noticia',
  templateUrl: './skeleton-noticia.component.html',
  styleUrls: ['./skeleton-noticia.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class SkeletonNoticiaComponent  implements OnInit {

  skeletons = signal<number[]>([]);
  countSkeletons = input<number>(10)
  constructor() {
    effect( () => {
      this.skeletons.set( Array(this.countSkeletons()) );
    });

  }

  ngOnInit() {}

}

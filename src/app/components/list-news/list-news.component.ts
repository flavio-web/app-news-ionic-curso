import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { News } from 'src/app/interfaces/news.interface';
import { NotImagePipe } from 'src/app/pipes/not-image.pipe';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.scss'],
  imports: [
    IonicModule,
    DatePipe,
    TitleCasePipe,
    NotImagePipe
  ],
  standalone: true,
})
export class ListNewsComponent {

  @Input() noticia!: News;
}

import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { News } from 'src/app/interfaces/news.interface';
import { NoticiaComponent } from '../noticia/noticia.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    NoticiaComponent
  ]
})
export class NoticiasComponent{

  @Input() noticias: News[] = [];

}

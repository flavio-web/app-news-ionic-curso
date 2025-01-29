import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { News } from 'src/app/interfaces/news.interface';
import { NotImagePipe } from 'src/app/pipes/not-image.pipe';
import { SubstringTextPipe } from 'src/app/pipes/substring-text.pipe';

@Component({
  selector: 'app-card-new',
  templateUrl: './card-new.component.html',
  styleUrls: ['./card-new.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NotImagePipe,
    TitleCasePipe,
    SubstringTextPipe
  ]
})
export class CardNewComponent{

  @Input() noticia!: News;
  @Output() showNoticia: EventEmitter<News> = new EventEmitter();


  seleccionarNoticia( noticia: News ){
    this.showNoticia.emit( noticia );
  }
}

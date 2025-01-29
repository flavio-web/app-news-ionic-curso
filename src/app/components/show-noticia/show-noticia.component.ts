import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { News } from 'src/app/interfaces/news.interface';
import { DataService } from 'src/app/services/data.service';
import { ListNewsComponent } from '../list-news/list-news.component';
import { OverlayEventDetail } from '@ionic/core/components'

@Component({
  selector: 'app-show-noticia',
  templateUrl: './show-noticia.component.html',
  styleUrls: ['./show-noticia.component.scss'],
  imports: [
    IonicModule,
    TitleCasePipe,
    DatePipe,
    ListNewsComponent
  ],
  standalone: true,
})
export class ShowNoticiaComponent  implements OnInit {

  @Input() noticia!: News;
  noticias: News[] = [];

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    if( !this.noticia.image ){
      this.noticia.image = 'assets/img/no-image.png';
    }

    this.getNoticiasSimiliares( this.noticia.category );
  }

  getNoticiasSimiliares( category: string ){
    this.dataService.getNewsByCategory( category ).subscribe( ( respuesta ) => {
      this.noticias = respuesta.data;
    });
  }

  cancel(){
    this.modalCtrl.dismiss();
  }

  onWillDismiss( event: Event ){
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  showNoticia( noticia: News){
    console.log('showNoticia', noticia);
  }

}

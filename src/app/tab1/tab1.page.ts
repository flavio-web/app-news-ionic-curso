import { Component, OnInit } from '@angular/core';
import { News } from '../interfaces/news.interface';
import { DataService } from '../services/data.service';
import { IonicSlides, ModalController } from '@ionic/angular';
import { ShowNoticiaComponent } from '../components/show-noticia/show-noticia.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  swiperModules = [IonicSlides];
  noticias: News[] = [];

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(){
    this.getNoticias();
  }

  getNoticias(){
    this.dataService.getNews().subscribe( ( respuesta ) => {
      console.log( respuesta );

      this.noticias = respuesta.data;
    })
  }

  async showNoticia( noticia: News ){
    console.log('showNoticia tab1', noticia);

    const modal = await this.modalCtrl.create({
      component: ShowNoticiaComponent,
      componentProps: {
        noticia
      }
    });

    modal.present();
  }

}

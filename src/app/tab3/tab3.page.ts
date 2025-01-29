import { Component, computed, effect, OnInit } from '@angular/core';
import { DataLocalStorageService } from '../services/data-local-storage.service';
import { News } from '../interfaces/news.interface';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  noticias = computed( () => this.dataLocalStorageService.noticias() );
  constructor( private dataLocalStorageService: DataLocalStorageService ) {
    effect( () => {
      console.log('effect ', this.noticias())
    });
  }

  /* ngOnInit(): void {
      this.init()
  }

  async init(){
    this.noticias = await this.dataLocalStorageService.cargarNoticiasFavoritos();
  } */

}

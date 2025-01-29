import { Injectable, OnInit, signal } from '@angular/core';
import { News } from '../interfaces/news.interface';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalStorageService implements OnInit {

  noticias = signal<News[]>([]);

  constructor(private storage: Storage) {
    this.storage.create();
  }

  ngOnInit(): void {
   this.cargarNoticiasFavoritos();
  }

  guardarNoticia( noticia: News ){
    const existeNoticia = this.noticias().find( (noti) => (noti.title).toLowerCase() === (noticia.title).toLowerCase() );
    if( !existeNoticia ){
      this.noticias.update( ( prev ) => [ noticia, ...prev ] )
      this.storage.set('favoritos', this.noticias());
    }
  }

  async cargarNoticiasFavoritos(){
    const noticiasFavoritos = await this.storage.get('favoritos');
    if( noticiasFavoritos ){
      this.noticias.set( noticiasFavoritos );
    }
  }

  borrarNoticia( noticia: News ){
    this.noticias.set( this.noticias().filter( (noti) => (noti.title).toLowerCase() !== (noticia.title).toLowerCase()) );
    this.storage.set('favoritos', this.noticias());
  }
}

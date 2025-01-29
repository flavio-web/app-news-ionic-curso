import { Component, computed, Input, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { News } from 'src/app/interfaces/news.interface';
import { NotImagePipe } from 'src/app/pipes/not-image.pipe';
import { DataLocalStorageService } from 'src/app/services/data-local-storage.service';
import { DataService } from 'src/app/services/data.service';
import { Share } from '@capacitor/share';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NotImagePipe
  ]
})
export class NoticiaComponent  implements OnInit {

  @Input() noticia!: News;
  @Input() indice!: number;
  enFavoritos: boolean = false;
  noticiasFavoritas = computed( () => this.localStorageService.noticias() );

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private localStorageService: DataLocalStorageService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.init();
  }

  async init(){
    if( this.noticia ){
      if( this.noticiasFavoritas().length === 0 ) return;

      const existeNoticiaFavorita = this.noticiasFavoritas().find( (noticia) => (noticia.title).toLowerCase() === (this.noticia.title).toLowerCase() );

      if( !existeNoticiaFavorita ) return;

      this.enFavoritos = true;
    }
  }

  async abrirNoticia(){
    if( !this.noticia.url ) return;

    await Browser.open({
      url: this.noticia.url
    });
  }

  async lanzarMenu(){
    let guardarBorrarBtn;

    if( this.enFavoritos ){
      //borrar favoritos
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () =>{
          console.log('Borrar de favoritos click');
          this.localStorageService.borrarNoticia( this.noticia );
          this.init();
          this.dataService.presentToast({
            color: 'primary',
            position: 'bottom',
            mode: 'ios',
            duration: 3000,
            message: 'Noticia borrada de su lista de favoritos'
          });
        }
      }

    }else{
      //guardar en favoritos
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () =>{
          console.log('Favorite clic');
          this.localStorageService.guardarNoticia( this.noticia );
          this.dataService.presentToast({
            color: 'primary',
            position: 'bottom',
            mode: 'ios',
            duration: 3000,
            message: 'Noticia agregada de su lista de favoritos'
          });
        }
      }
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: async () => {
            console.log('Share clic');
            await Share.share({
              title: this.noticia.title,
              text: this.noticia.description,
              url: this.noticia.url
            });
          }
        },
        guardarBorrarBtn,
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          cssClass: 'action-dark',
          handler: () => {
            console.log('cancelar click');
          }
        }
      ]
    });

    await actionSheet.present();
  }

}

import { Component, OnInit, signal } from '@angular/core';
import { DataService } from '../services/data.service';
import { News } from '../interfaces/news.interface';
import { SegmentValue } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  segment: string = '';
  categorias: string[] = [
    'general',
    'business',
    'entertaiment',
    'helth',
    'science',
    'sports',
    'technology'
  ];
  noticias: News[] = [];
  page: number = 0;
  isLoad = signal<boolean>(false);

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.segment = this.categorias[0];
    this.segmentChanged( this.segment );
  }
  segmentChanged( category: string | SegmentValue = '' ){
    console.log({ category });
    this.segment = category as string;
    this.isLoad.set( true );
    this.dataService.getNewsPaginationByCategory( category as string, this.page ).subscribe( ( resp ) => {
      console.log( resp );
      this.isLoad.set( false );
      if( resp.error ){
        this.dataService.presentAlert({
          header: 'Oops!',
          message: resp.error.message,
          buttons: ['Ok']
        });
        return;
      }

      this.noticias.push( ...resp.data )
      this.page++;
    })
  }

  doRefresh( event: any ){
    console.log( event );
    this.page = 0;
    this.noticias = [];
    this.isLoad.set( true );
    setTimeout(() => {
      this.segmentChanged( this.segment );
      event.target.complete();
    }, 1500);
  }

  async loadData(event: any){
    console.log( event );
    event.preventDefault();
    event.stopPropagation();
    await this.segmentChanged( this.segment );
    setTimeout( async () => {
      await event.target.complete();
    }, 1500);
  }

}

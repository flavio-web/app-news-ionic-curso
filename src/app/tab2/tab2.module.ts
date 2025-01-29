import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { NoticiasComponent } from "../components/noticias/noticias.component";
import { SkeletonNoticiaComponent } from '../components/skeleton-noticia/skeleton-noticia.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    NoticiasComponent,
    SkeletonNoticiaComponent
],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}

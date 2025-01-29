import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ResponseNews } from '../interfaces/news.interface';
import { AlertController, AlertOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  getNews(): Observable<ResponseNews>{
    return this.http.get<ResponseNews>(this.apiUrl);
  }

  getNewsByCategory( category: string ): Observable<ResponseNews>{
    return this.http.get<ResponseNews>(`${this.apiUrl}&categories=${category}`);
  }

  getNewsPaginationByCategory( category: string, page: number ): Observable<ResponseNews>{
    return this.http.get<ResponseNews>(`${this.apiUrl}&categories=${category}&offset=${page}`)
      .pipe(
        delay( 2000 )
      )
  }

  async presentAlert( options: AlertOptions ){
    const alert = await this.alertCtrl.create({ ...options });
    await alert.present();
  }

  async presentToast( options: ToastOptions ){
    const toast = await this.toastCtrl.create({ ...options });
    toast.present();
  }
}

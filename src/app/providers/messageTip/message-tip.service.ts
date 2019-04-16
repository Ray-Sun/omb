import { Injectable } from '@angular/core';
import { ToastController,LoadingController,AlertController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';


const TOAST_TIME=2000;
const TOAST_POSITION = 'middle';

@Injectable({
  providedIn: 'root'
})
export class MessageTipService {

  constructor(
    private toastController:ToastController,
    private loadingController: LoadingController,
    private alertController:AlertController
  ) { }

  public async toastMessage(message:string){
    const toast = await this.toastController.create({
      message: message,
      duration: TOAST_TIME,
      position: TOAST_POSITION
    });
    toast.present();
  }

  public loader(){
    return this.loadingController.create({
      message: 'Please wait...'
    });
  }

  public async alertConfirm(message,confirmHandler){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `<strong>${message}</strong>!!!`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'OK',
          handler:confirmHandler
        }
      ]
    });
    await alert.present();
  }
}

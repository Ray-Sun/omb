import { Injectable } from '@angular/core';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

const LOCAL_EMAIL_NAME = 'email'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private storage: NativeStorage,
  ) { }

  async getLocalEmail(){
    let keys = await this.storage.keys();
    if(keys&&keys.indexOf(LOCAL_EMAIL_NAME)>=0){
      return this.storage.getItem(LOCAL_EMAIL_NAME)
      .catch(error => console.error(error));
    }else{
      return '';
    }
  }

  async setLocalEmail(email){
    return this.storage.setItem(LOCAL_EMAIL_NAME,email)
    .catch(error => console.error(error));
  }

}

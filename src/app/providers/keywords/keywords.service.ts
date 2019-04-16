import { Injectable } from '@angular/core';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { RequestService } from "../request/request.service";
import { IRequest } from "../IRequest";
import { of } from 'rxjs';


const LOCAL_NAME = 'keywords'
const LOCAL_LIMIT = 10;

const DELAYDAYS = 14;

const addDays = (days: number, date: Date = (new Date())) => {
  let newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
};

export interface ITip {
  _id:string,
  keywords: string;
  email?: string;
  telegram?: string;
  expiredDate?: Date;
};

@Injectable({
  providedIn: 'root'
})
export class KeywordsService {
  request:IRequest;
  constructor(
    private storage: NativeStorage,
    private requestService: RequestService,
  ) { 
    this.request = requestService.request;
  }

  public async getLocalKeywords() {
    let keys = await this.storage.keys();
    if(keys&&keys.indexOf(LOCAL_NAME)>=0){
      return this.storage.getItem(LOCAL_NAME).then((result) => {
        console.log(result);
        return result ? result : [];
      }).catch(error => console.error(error));
    }else{
      let keywords = [];
      await this.storage.setItem(LOCAL_NAME, keywords).catch(error => console.error(error));
      return keywords;
    }
  }

  public async setLocalKeywords(keywords) {
    let keywordsList = await this.getLocalKeywords();
    keywordsList = [keywords, ...keywordsList];
    if (keywordsList.length > LOCAL_LIMIT) {
      keywordsList.pop();
    }
    return this.storage.setItem(LOCAL_NAME, keywordsList)
      .catch(error => console.error(error));
  }

  removeAllKeywords(){
    return this.storage.remove(LOCAL_NAME);
  }

  saveKeywordsToTip(email,keywords){
    if(email&&email.indexOf('@')&&keywords.trim()){
      return this.request.post('/tips',{email:email,keywords:keywords.trim()});
    }else{
      return of({status:0});
    }
  }

  getTipsByEmail(email){
    if(email&&email.indexOf('@')){
      return this.request.get(`/tips?email=${email}`);
    }else{
      return of({status:0,tips:[]});
    }
  }

  deleteTip(id){
    if(id){
      return this.request.delete('/tips',{id:id})
    }else{
      return of({status:0});
    }
  }

  delayTip(tip:ITip){
    if(tip._id){
      let newTip = {expiredDate:addDays(DELAYDAYS,new Date(tip.expiredDate))};
      return this.request.patch('/tips',Object.assign({},tip,newTip))
    }else{
      return of({status:0,expiredDate:null});
    }
  }



}

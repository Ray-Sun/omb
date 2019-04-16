import { Component, OnInit} from '@angular/core';
import { IonItemSliding } from "@ionic/angular";

import { AccountService } from "../providers/account/account.service";
import { KeywordsService,ITip } from "../providers/keywords/keywords.service";
import { MessageTipService } from "../providers/messageTip/message-tip.service";

const mockTips:ITip[] = [
  {
      "_id" :  "5c9ae6de490cab0755d39e4b",
      "expiredDate" :  new Date("2019-04-28T02:58:38.816Z"),
      "keywords" : "phone",
      "email" : "sunsw-cn@qq.com",
  },
  {
      "_id" :  "5c9b400be5c2c30bcc5c83cc",
      "expiredDate" :  new Date("2019-04-28T09:19:07.046Z"),
      "keywords" : "tv",
      "email" : "sunsw-cn@qq.com",
  },
  {
      "_id" :  "5c9efd1e2d428e044e5e831f",
      "expiredDate" :  new Date("2019-04-31T05:22:38.364Z"),
      "keywords" : "nokia",
      "email" : "sunsw-cn@qq.com",
  },
  {
      "_id" :  "5c9efd6e59cf1d045d60e11b",
      "expiredDate" :  new Date("2019-04-31T05:23:58.639Z"),
      "keywords" : "Pepsi",
      "email" : "sunsw-cn@qq.com",
  },
  {
      "_id" :  "5ca6f71f522e1a0572801ffa",
      "expiredDate" :  new Date("2019-04-06T06:35:11.468Z"),
      "keywords" : "huawei",
      "email" : "sunsw-cn@qq.com",
  }];

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  tips:ITip[];
  localKeywords:string[];
  constructor(
    private accountService:AccountService,
    private keywordsService:KeywordsService,
    private messageTipService:MessageTipService
  ) {
    this.tips =[];
    this.localKeywords = [];
  }

  async ngOnInit() {

    //get local history 
    this.localKeywords =  await this.keywordsService.getLocalKeywords();


    //get tips by email
    const loading = await this.messageTipService.loader();
    await loading.present();
    let email = await this.accountService.getLocalEmail();
    this.keywordsService.getTipsByEmail(email)
      .subscribe(result => { 
        this.tips = result.tips; 
        loading.dismiss();
      });

  }

  delete(tipId:string){
    let message = 'Are you sure to remove the tip';
    let confirm = async()=>{
      const loading = await this.messageTipService.loader();
      loading.present();
      this.keywordsService.deleteTip(tipId)
      .subscribe(result=>{
        if(result.result){
          this.tips = this.tips.filter(item=>item._id!==tipId);
        }
        loading.dismiss();
      });
    };
    this.messageTipService.alertConfirm(message,confirm);
  }

  async delay(slidingItem:IonItemSliding,tip:ITip){
    slidingItem.closeOpened();
    const loading = await this.messageTipService.loader();
    loading.present();
    this.keywordsService.delayTip(tip).subscribe(async(result)=>{
      await loading.dismiss();
      let message='ERROR';
      if(result.status){
        message = 'Updated Successfully';
        tip.expiredDate = result.newTip.expiredDate;
      }
      this.messageTipService.toastMessage(message);
    });
  }

  clearHistory(){
    let result = this.keywordsService.removeAllKeywords();
    if(result){
      this.messageTipService.toastMessage('Clear~');
      this.localKeywords = [];
    }else{
      this.messageTipService.toastMessage('Error');
    }
  }
}

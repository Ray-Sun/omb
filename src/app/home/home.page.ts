import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { IonInfiniteScroll } from "@ionic/angular";
import { Platform } from '@ionic/angular';

import { RequestService } from "../providers/request/request.service";
import { IFeed } from "../objects/feed";
import { IRequest } from "../providers/IRequest";
import { KeywordsService } from "../providers/keywords/keywords.service";
import { MessageTipService } from "../providers/messageTip/message-tip.service";
import { AccountService } from "../providers/account/account.service";


const PAGE_SIZE = 10;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  feedList: IFeed[];
  keywords: string;
  page: number;
  request: IRequest;
  keywordsHistory: any;
  moreData:boolean;

  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;

  constructor(
    private router:Router,
    private platform:Platform,
    private requestService: RequestService,
    private keywordsService: KeywordsService,
    private messageTip: MessageTipService,
    private accountService:AccountService
  ) {
    this.request = requestService.request;
  }

  ngOnInit() {

    this.platform.ready().then(async ()=>{
      console.log('home page init ....');
      this.keywordsHistory = await this.keywordsService.getLocalKeywords();
  
      const loading = await this.messageTip.loader();
      await loading.present();
  
      //search old record
      if(this.keywordsHistory.length>0){
        this.page = 0;
        this.feedList = [];
        this.searchBargains(this.keywordsHistory.join(' '),()=>{
          loading.dismiss();
        })
  
      }else{//get recommendations
        this.request.get('/recommendations').subscribe(result => {
        this.feedList = result.feeds;
        this.ionInfiniteScroll.disabled = true;
        this.moreData = false;
        loading.dismiss();
       });
      }
    })

    //get recommendations
    // this.request.get('/recommendations').subscribe(result => {
    //   console.log(result);
    //   this.feedList = result.feeds;
    //   this.ionInfiniteScroll.disabled = true;
    //   loading.dismiss();
    // });
  }

  private async searchBargains(keywords,callback) {

    this.request.get(`/feeds?keywords=${keywords}&page=${this.page}`).subscribe(result => {
      this.ionInfiniteScroll.disabled = false;
      if (result.feeds && result.feeds.length > 0) {
        this.feedList = [...this.feedList, ...result.feeds];
        if (result.feeds.length < PAGE_SIZE) {
          this.ionInfiniteScroll.disabled = true;
          this.moreData = false;
          
        } else {
          this.page++;
          this.moreData = true;
        }
      }
      if (result.feeds && result.feeds.length == 0) {
        this.ionInfiniteScroll.disabled = true;
        this.moreData = false;
      }
      callback()
    });
  }

  async search(keywords) {
    if (keywords.trim()) {
      this.page = 0;
      this.moreData = true;
      this.feedList = [];
      this.keywords = keywords.trim();
      //save new search record
      if (this.keywordsHistory.indexOf(keywords) == -1) {
        this.keywordsService.setLocalKeywords(keywords).then(keywords => {
          this.keywordsHistory = keywords;
        });
      }
      const loading = await this.messageTip.loader();
      await loading.present();
      this.searchBargains(this.keywords,() => {
        loading.dismiss();
      });
    } else {
      this.messageTip.toastMessage('Please input ...');
    }
  }

  loadData(event) {
    this.searchBargains(this.keywords,() => event.target.complete());
  }

  async subscribeKeywords() {
    // check the email firstly;  
    let email = await this.accountService.getLocalEmail();
    if (email.trim() && this.keywords.trim()) {//save the keyword directly
      const loading = await this.messageTip.loader();
      await loading.present();
      this.keywordsService.saveKeywordsToTip(email, this.keywords)
        .subscribe(result => {
          loading.dismiss();
          let message = result.status==1?'Subscribed!':'Error!!';
          this.messageTip.toastMessage(message);
        })
    } else { //or goto email page if no saved email 
      this.router.navigateByUrl('/message');
    }
  }


}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {

  keywords:string;
  tipsShow:boolean;
  @Output() onSearch: EventEmitter<string>;
  @Input() tips:string[];

  constructor(private loadingController:LoadingController) { 
    this.onSearch = new EventEmitter<string>();
    this.tips = [];
  }

  ngOnInit() {
    this.tipsShow = false;
  }

  async search(){
    this.hideTips();  
    const loading = await this.loadingController.create({
      message: 'Please wait'
    });
    this.onSearch.emit(this.keywords);
    await loading.dismiss();
  }

  hideTips(){
    this.tipsShow = false;
  }

  showTips(){
    !this.tips||this.tips.length==0||(this.tipsShow = true);
  }

  resetKeywords(keywords){
    console.log(keywords);
    this.keywords = keywords;
    this.search();
  }

}

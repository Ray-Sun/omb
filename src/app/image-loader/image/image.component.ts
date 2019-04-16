import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {

  @Input() src:string;
  loaded:boolean;
  constructor() { }

  ngOnInit() {
    this.loaded = false;
  }

  loadFinised(){
    this.loaded = true;
  }

}

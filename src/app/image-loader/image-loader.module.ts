import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ImageComponent } from "./image/image.component";


@NgModule({
  declarations: [ImageComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[ImageComponent]
})
export class ImageLoaderModule { }

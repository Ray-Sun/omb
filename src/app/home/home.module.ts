import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { SearchModule } from "../search/search.module";
import { ImageLoaderModule } from "../image-loader/image-loader.module";

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchModule,
    ImageLoaderModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

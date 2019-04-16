import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AccountComponent } from "./account/account.component";

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path:'',
        component:AccountComponent
      }
    ])
  ]
})
export class MessagePageModule { }

import { Component, OnInit } from '@angular/core';

import { AccountService } from "../../providers/account/account.service";
import { MessageTipService } from "../../providers/messageTip/message-tip.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  email:string;
  constructor(
    private account:AccountService,
    private messageTipService:MessageTipService
  ) { }

  async ngOnInit() {
    //get local email 
    const loading = await this.messageTipService.loader();
    this.email = await this.account.getLocalEmail();
    loading.dismiss();
  }

  async saveEmail() {
    const loading = await this.messageTipService.loader();
    loading.present();
    this.account.setLocalEmail(this.email).then(async(result) => {
      await loading.dismiss();
      this.messageTipService.toastMessage('Saved Successfully');
    }
    );
  }



}

import { Injectable } from '@angular/core';
import { Platform } from "@ionic/angular";

import { IRequest } from "../IRequest";
import { AngularRequestService } from "../angular-request/angular-request.service";
import { NativeRequestService } from "../native-request/native-request.service";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  request:IRequest;
  constructor(
    private platform:Platform,
    private angularRequest:AngularRequestService,
    private nativeRequest:NativeRequestService
  ) { 
    this.request = (this.platform.is('ios')||this.platform.is('android'))?this.nativeRequest:this.angularRequest;
  }
}

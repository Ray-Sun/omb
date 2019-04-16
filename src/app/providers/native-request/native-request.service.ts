import { Injectable } from '@angular/core';
import {HTTP} from '@ionic-native/http/ngx';
import {Observable,from as fromPromise} from 'rxjs';
import { APPKEY,RequestConfig } from "../../config";
import { IRequest } from "../IRequest";

const httpHeaders = { 'Content-Type': 'application/json',key: APPKEY };

@Injectable({
  providedIn: 'root'
})
export class NativeRequestService implements IRequest {

  constructor(public http: HTTP) {
    //dev
    this.http.setSSLCertMode('nocheck');
  }

  post(url,item):Observable<any>{
    const response = this.http.post(RequestConfig.Host+url,item,httpHeaders)
    .then(resp => JSON.parse(resp.data));
    return fromPromise(response);
  }

  delete(url,item={}):Observable<any>{
    const response = this.http.delete(RequestConfig.Host+url,item,httpHeaders)
    .then(resp => JSON.parse(resp.data));
    return fromPromise(response);
  }

  patch(url,item):Observable<any>{
    const response = this.http.patch(RequestConfig.Host+url,item,httpHeaders)
    .then(resp => JSON.parse(resp.data));
    return fromPromise(response);
  }

  get(url,item={}):Observable<any>{
    const response = this.http.get(RequestConfig.Host+url,item,httpHeaders)
    .then(resp => JSON.parse(resp.data));
    return fromPromise(response);
  }
}

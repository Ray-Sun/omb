import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { APPKEY,RequestConfig } from "../../config";
import { IRequest } from "../IRequest";

const headers = new HttpHeaders({ 
  'Content-Type': 'application/json',
  'key':APPKEY
});
const httpOptions = {headers:headers};

@Injectable({
  providedIn: 'root'
})
export class AngularRequestService implements IRequest{
  constructor(public http:HttpClient) { }

  post(url,item):Observable<any>{
    return this.http.post(RequestConfig.Host+url,item,httpOptions);
  }

  delete(url,item={id:0}):Observable<any>{
    return this.http.delete(RequestConfig.Host+url+'?id='+item.id,httpOptions);
  }

  patch(url,item):Observable<any>{
    return this.http.patch(RequestConfig.Host+url,item,httpOptions);
  }

  get(url,item={}):Observable<any>{
    return this.http.get(RequestConfig.Host+url,httpOptions);
  }

}

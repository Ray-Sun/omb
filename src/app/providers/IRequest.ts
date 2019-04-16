import {Observable} from 'rxjs';

export interface IRequest{
    post(url,item):Observable<any>;
    
      delete(url,item?):Observable<any>;
    
      patch(url,item):Observable<any>;
    
      get(url,item?):Observable<any>;
}
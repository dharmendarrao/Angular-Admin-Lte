import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable'

@Injectable()
export class AppApiHitService {
headers = new Headers({'Content-Type':'application/json'});
  constructor(private http: Http) { }
onPostUserDataAndGet(url:string,parameters:any){
  
return this.http.post(url, parameters,{headers:this.headers});

//console.log(parameters);


}
onPostUserDataAndGetwithoutHeader(url:string,parameters:any){
  
//return this.http.post(url, parameters,{headers:this.headers});
return this.http.post(url, parameters);
//console.log(parameters);


}

}

import { Component, OnChanges } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnChanges {
  title = 'app';
  authcheck:boolean= false;


constructor(private auth:AuthService){
this.auth.newchange.subscribe((data)=>{

this.authcheck = data;
});

  //localStorage.removeItem('token');
//if(localStorage.getItem('token')){
  //this.authcheck = true;
//}else{
  //this.authcheck = false;
//}

}
ngOnChanges(){
  
}

}

import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppApiHitService } from '../app-api-hit.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterContentInit {
loginForm:FormGroup;
errorMessage2:any;
  constructor(private fb:FormBuilder, private api:AppApiHitService, private router:Router,
     private auth:AuthService,
    private location:Location ) { 

if(localStorage.getItem('token')){
  
 // this.router.navigate(['/dashboard']);
  
 
}

  }
ngAfterContentInit(){

}
  ngOnInit() {
this.auth.messageAuth.subscribe((errordata)=>{
this.errorMessage2 = errordata;
});

this.loginForm = this.fb.group({

email: new FormControl(null, [Validators.required, Validators.email]),
password: new FormControl(null, Validators.required),

});


  }
onSubmit(){
  
if(this.loginForm.valid){
this.api.onPostUserDataAndGet('http://localhost/prectice_api/api/user/login',JSON.stringify(this.loginForm.value))
.subscribe((response)=>{
if(response.status==200){
  var res = response.json();
  if(res.status=='TRUE'){
localStorage.setItem('token',res.data.authtoken);
localStorage.setItem('email_data',res.data.email);

this.router.navigate(['/dashboard']);


}else{
  if(res.error){this.errorMessage2 = res.error;}else{
    this.errorMessage2 = res.data;
  }
  setTimeout(()=>{
this.errorMessage2 = '';
  },2000);
}
}

});
}
}

}

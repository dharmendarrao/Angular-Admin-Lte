import { Injectable } from '@angular/core';
import { Router, CanActivate,
  ActivatedRouteSnapshot } from '@angular/router';
  import { Subject } from 'rxjs/Subject';
@Injectable()
export class AuthService implements CanActivate {
newchange = new Subject<boolean>();
messageAuth = new Subject<string>();
  constructor(private router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    
if(localStorage.getItem('token')){
  this.newchange.next(true);
return true;
}else{
  this.router.navigate(['/login']);
  this.newchange.next(false);
  return false;
}


   }

   nonAuthRedirect(messagedata){
     this.messageAuth.next(messagedata);
     
localStorage.removeItem('token');
localStorage.removeItem('email');
this.newchange.next(false);
   // this.router.navigate(['/login']);
   }

}

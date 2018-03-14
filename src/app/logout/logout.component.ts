import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) {
localStorage.removeItem('token');
localStorage.removeItem('reload');
this.router.navigate(['/dashboard']);

   }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
currentRoute:string;
  constructor( private route:ActivatedRoute, private router:Router, private location:Location ) { }

  ngOnInit() {

this.route.params.subscribe((params:Params)=>{

//console.log(params['id']);

});
this.router.events.subscribe(val=>{
if(this.location.path !==null){
this.currentRoute =  this.location.path();
}else{
  this.currentRoute='dashboard';
}

  


});


  }

}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {DynamicPageModel} from './dynamic-page.model';
import { AsyncSubject } from 'rxjs/AsyncSubject';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css']
})
export class DynamicPageComponent implements OnInit, AfterViewInit {
dynamicForm:FormGroup;
formdata :DynamicPageModel[];
  countries = [
   {id:1, name:'USA'},
     {id:2, name:'India'},
     {id:3, name:'Australia'},
     {id:4, name: 'Brazil'}
  ];
    asyncsubjecy= new AsyncSubject();
  constructor() { 


    
  }
ngAfterViewInit(){
this.asyncsubjecy.next({abc:'a'});  

}
  ngOnInit() { 
    this.asyncsubjecy.subscribe((val)=>{
      alert(val);
    },
  (e)=>{
console.log(e);
  },
()=>{
console.log();
}
  );
    this.formdata = new Array;
this.dynamicForm = new FormGroup({

  name:new FormControl(null),
  company:new FormControl(null),
  qty:new FormControl(null),
  status:new FormControl(null),
  country:new FormControl(null),
  test_check:new FormControl(false),
  test_input:new FormControl(null),
  test_check2:new FormControl(false),
  test_input2:new FormControl(null),
});



  }

  onSubmit(){
    console.log(this.dynamicForm.value);
this.formdata.push(this.dynamicForm.value);
console.log(this.dynamicForm.controls.test_check.value);
  }

  onEdit(index){
//console.log(this.formdata[index]);
this.dynamicForm.patchValue(this.formdata[index]);

  }

}

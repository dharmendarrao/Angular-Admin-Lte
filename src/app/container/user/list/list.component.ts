import { Component, OnInit , AfterViewInit, Directive, Renderer, ElementRef, Input, OnDestroy} from '@angular/core';
import { AppApiHitService } from '../../../app-api-hit.service';
import { Location } from '@angular/common';
import { Router } from  '@angular/router';
import * as $ from 'jquery';
import 'datatables.net'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
pagination:number;
limit:number;
public tableWidget: any;
public elmentclear;

  constructor(private appAPiService:AppApiHitService, private location:Location, private router:Router, elementRef: ElementRef, renderer: Renderer) {

this.elmentclear = renderer.listen('document', 'click', (event) => {
      // Do something with 'event'
    event.preventDefault();
//console.log(event.originalTarget.className);
if(event.originalTarget.className=="glyphicon glyphicon-edit"){
     if(event.originalTarget.parentElement.id=='user_edit'){
      this.router.navigate([event.originalTarget.parentElement.attributes[2].nodeValue]);
     }
}
//this.router.navigateByUrl(a);

    });;


   }
  ngOnDestroy(){
    
     if (this.elmentclear) {
      this.elmentclear();
    }
    
  }
onBack(){
 this.location.back();
}
ngAfterViewInit() {
    
  }
    private initDatatable(): void { 
    let exampleId: any = $('#example');
    this.tableWidget = exampleId.DataTable({
            "processing": true,
            "serverSide": true,
            "ajax":{
                     "url": "http://localhost/prectice_api/api/user/list",
                     "dataType": "json",
                     "type": "POST"
                     
                   },
            "columns": [
                { "data": "select" },
                { "data": "first_name" },
                { "data": "last_name" },
                { "data": "email" },
                { "data": "gender" },
                { "data": "created_at" },
                { "data": "options" }
            ],
            
             'columnDefs': [{
         'targets': 0,
         'searchable':false,
         'orderable':false,
         'className': 'dt-body-center',
         'render': function (data, type, full, meta){
             return '<input class="innercheck" type="checkbox" name="id[]" value="' 
                + $('<div/>').text(data).html() + '">';
         }
      },
        {
         'targets': 6,
         'searchable':false,
         'orderable':false,
         'className': 'dt-body-center',
         'render': function (data, type, full, meta){
             //return '<input class="innercheck" type="checkbox" name="id[]" value="' 
               // + $('<div/>').text(data).html() + '">'; 
               
                return '<a id="user_edit" (click)="onUserClick()" data="user_list/edit/'+data+'"'
                +'title="EDIT" ><span class="glyphicon glyphicon-edit"></span>' 
                + '</a>';
         }
      }],
             select: {
            style:    'os',
            selector: 'td:first-child'
        },
        order: [[ 5, 'desc' ]]

        });
  }
  onUserClick(){
    alert('a');
  }
  ngOnInit() {
this.initDatatable();

  }


//$(document).on('click','#user_edit',function(event){
//event.preventDefault();
//var sendlocation = $(this).attr('href');

//this.router.navigateByUrl('/dashboard');
//});



}

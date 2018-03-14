import { Directive, ElementRef, OnInit, Renderer2, Renderer, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appStyleChange]'
})
export class StyleChangeDirective implements OnInit {
@HostBinding('style.backgroundColor') backgrounColor:string='red';
  constructor(private elementRef:ElementRef, private renderer:Renderer2, private renderer1: Renderer) { }

ngOnInit(){

//this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','red');

//this.elementRef.nativeElement.style.backgroundColor='green';
//this.renderer1.setElementStyle(this.elementRef.nativeElement,'background-color','green');
} 
@HostListener('change') onGenderSelect(eventDat:Event){
  
  //console.log(eventDat);
  this.backgrounColor = 'green';
//this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','green');
//console.log(this.renderer);
}


}

import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisbaleControl]'
})
export class DisbaleControlDirective {
  
  constructor(private ngControl : NgControl) { }
@Input() set disableControl( condition : boolean ) {
  
    const action = condition ? 'enable' : 'disable';
    this.ngControl.control[action]();
  }
}

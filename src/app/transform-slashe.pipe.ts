import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformSlashe'
})
export class TransformSlashePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

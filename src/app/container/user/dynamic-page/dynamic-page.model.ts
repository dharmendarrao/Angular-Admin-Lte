export class DynamicPageModel {
public name: string;
public company: string;
public qty: number;
public status: string;

constructor(name: string, company: string, qty: number, status: string){
   this.name=name;
   this.company=company;
   this.qty=qty;
   this.status=status;
}
}
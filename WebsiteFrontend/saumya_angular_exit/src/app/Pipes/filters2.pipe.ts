import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters2'
})
export class Filters2Pipe implements PipeTransform {

  transform(value: any, filterString:string, args?:any){
    if (value.length === 0 ){
      return value;
    }
 


    const products = [];
    for(const product of value){
      if(product['category'] === filterString || 
      product['name'].toLowerCase() === filterString.toLocaleLowerCase() || 
      product['brand'] === filterString || 
      product['price'] === filterString){
        products.push(product)
      }
    }
    return products;


  }
}

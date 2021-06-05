import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  transform(list: any[], searchText: string): any {
    return list ? list.filter(item => item.name.search(new RegExp(searchText, 'i')) > -1) : [];
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userFilter' })
export class FilterPipe implements PipeTransform {
  transform(list: any[], searchText: string): any {
    if (!list) {
        return [];
    }
    if (!searchText) {
        return list;
    }
    searchText = searchText.toLowerCase();
    var ans = list.filter(it => {
      return it.name.toLowerCase().includes(searchText);
    });

    if(ans.length===0){
        return [{name : "Match Not Found"}] ;
    }
    else{
        return ans;
    }
    // return list ? list.filter(item => item.name.search(new RegExp(searchText, 'i')) > -1) : [{name: 'No Match Found'}];
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestHandlerService {
  private Url = "http://localhost:3000"
  
  constructor(private http: HttpClient) { }
  getUserWithId(id:string):Observable<any>{
    return this.http.get(this.Url+"/api/userById/"+id);
  }
  patchUsersWithAmount(data:any):Observable<any>{
    console.log(data);
    return this.http.patch(this.Url+"/api/amountUpdate/"+data.id,data.item);
  }
}

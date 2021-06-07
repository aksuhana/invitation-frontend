import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RequestHandlerService {
  Url = environment.URL;
  
  constructor(private http: HttpClient) { }
  getUserWithId(id:string):Observable<any>{
    return this.http.get(this.Url+"/api/userById/"+id);
  }
  patchUsersWithAmount(data:any):Observable<any>{
    return this.http.patch(this.Url+"/api/amountUpdate/"+data.id,data.item);
  }
}

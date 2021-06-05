import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpAPIRequestService {
  private Url = "http://localhost:3000"
  constructor(private http: HttpClient) {}
  // datatoPost(datatoSend : {username:string, email:string, gender:string}): Observable<any>{
  //   return this.http.post(this.Url+"/send", datatoSend,{
  //     headers: new HttpHeaders({
  //       "Content-Type":"application/json"
  //     })
  //   });
  // }
  datatoGet() : Observable<any>{
    return this.http.get(this.Url+"/api/fetchUser");
  }
  datatoDelete(id: string) : Observable<any>{
    return this.http.delete(this.Url+"/api/deleteUser/"+id);
  }

  datatoUpdate(id: string, datatoUpdate: {name:string, amount:number, address:string, mobile:number, gift:string}): Observable<any> {
    return this.http.patch(this.Url+"/api/updateUser/"+id, datatoUpdate);
  }

}

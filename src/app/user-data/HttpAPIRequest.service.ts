import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpAPIRequestService {
  private Url = environment.URL;
  constructor(private http: HttpClient) {}

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

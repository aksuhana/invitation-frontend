import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestHandlerService {
  private Url = "http://localhost:3000"
  private temp_id="60bb7846fdb4d68465a64246"
  constructor(private http: HttpClient) { }
  patchUsersWithAmount(data:any):Observable<any>{
    console.log(data);
    return this.http.patch(this.Url+"/api/amountUpdate/"+this.temp_id,data.item);
  }
}

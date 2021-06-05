import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpApiService {
private URL = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  //GET Request
  getData(): Observable<any>{
      return this.http.get(this.URL+"/api/fetchUser",{
          headers: new HttpHeaders({
              "Content-Type": "application/json"
          })
      });
  }

  //POST Request
  postData(data:{name:string, address:string, mobile:number}): Observable<any>{
    console.log("Post "+data.name, data.address, data.mobile);
    return this.http.post(this.URL+"/api/send",data,{      
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });   
  }
}

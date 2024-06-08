import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUserDetailsInterface, PostUserDetailsInterface } from 'src/app/models/user-details';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {
    // this.httpClient = new HttpClient(handler);
  }
  getUserDetails(): Observable<any> {
    return this.http.get<any>(`${environment.getUserDetails}`);
  }
  addNewUser(userDetails: PostUserDetailsInterface): Observable<any> {
    return this.http.post<any>(`${environment.postUserDetails}`,userDetails);
  }
  updateUserDetails(user_id:number,userDetails:any){
    return this.http.put<any>(`${environment.updateUserDetails}?user_id=${user_id}`,userDetails);
  }
  deleteUserDetails(user_id:number){
    return this.http.delete<any>(`${environment.deleteUserDetails}?user_id=${user_id}`);
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class ContactformServiceService {
  private emailUrl = ' http://gcproductions.in/form/formservice.php';

  constructor(private http: Http) { }
  sendEmail(data, tickets,total): Observable<any> {
    data.tickets = tickets;
    data.total = total;
    return this.http.post(this.emailUrl, data)
      .map(response => {
        console.log('Success', response);
        return response;
      })
      .catch(error => {
        //console.log('Some error ', error);
        return Observable.throw(error)
      })
  }
}

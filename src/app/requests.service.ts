import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOfferingRequest } from './models/requests/CreateOfferingRequest';
import { CreateUserRequest } from './models/requests/CreateUserRequest';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private readonly server = "http://localhost:54491";

  constructor(private http: HttpClient) { }

  startWorkflow(): Observable<string> {
    return this.http.post<string>(this.server + '/workflow-poc/start', {});
  }

  selectOffering(offering: string): Observable<string> {
    return this.http.post<string>(this.server + '/workflow-poc/select-offering/' + offering, {});
  }

  addOffering(type: string, fieldA: string, fieldB: string, fieldC: string, fieldD?: string): Observable<string> {
    const body: CreateOfferingRequest = {
      fieldA: fieldA,
      fieldB: fieldB,
      fieldC: fieldC
    };

    if (fieldD) body.fieldD = fieldD;

    return this.http.post<string>(`${this.server}/workflow-poc/add-offering-${type.toLowerCase()}`, body);
  }

  getOfferingTypeFromAddUserTask(): Observable<string>{
    const headers = new HttpHeaders().set('content-type', 'application/json').set('accept', 'application/json');
    return this.http.get<string>(this.server + '/workflow-poc/get-offering-type-from-user-task', { 'headers': headers });
  }

  addUser(name: string, surname: string, email: string, offeringId: string, addAnother: boolean): Observable<void> {
    const endPoint = '/workflow-poc/add-user';
    const body: CreateUserRequest = {
      name: name,
      surname: surname,
      address: email,
      offeringId: offeringId,
      addAnother: addAnother
    };

    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.post<void>(this.server + endPoint, JSON.stringify(body), { 'headers': headers });
  }

  initialise(): Observable<string> {
    return this.http.post<string>(this.server + '/workflow-poc/initialise-offering', {});
  }
}

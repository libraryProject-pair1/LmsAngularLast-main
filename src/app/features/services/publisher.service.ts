
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { Publisher } from '../models/publisher';
import { Response } from '../models/response';
import { SingleResponseModel } from '../models/singleResponseModel';
@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  selectedPublisher:any;
  constructor(private httpClient: HttpClient) { }

  getAllPublisher(): Observable<ResponseModel<Publisher>> {
    return this.httpClient.get<ResponseModel<Publisher>>(
      'http://localhost:5278/api/Publishers?PageIndex=0&PageSize=30'
    );
  }
  getById(id: number): Observable<ResponseModel<Publisher>> {
    return this.httpClient.get<ResponseModel<Publisher>>('http://localhost:5278/api/Publishers/' + id)
  }
  add(publisher: Publisher): Observable<any> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>('http://localhost:5278/api/Publishers', publisher, { headers: headers })
  }

  editPublisher(publisher: Publisher): Observable<any> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<any>('http://localhost:5278/api/Publishers', publisher, { headers: headers })
  }


  deletePublisher(publisherId: number) {
    return this.httpClient.delete('http://localhost:5278/api/Publishers/' + publisherId);
  }
}

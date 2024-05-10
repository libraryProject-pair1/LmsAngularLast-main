import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { Author } from '../models/Author';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  selectedAuthor:any;
  apiUrl="http://localhost:5278/api/Authors";
  constructor(private httpClient:HttpClient) { }
  
  getAllAuthors():Observable<ResponseModel<Author>>{
    return this.httpClient.get<ResponseModel<Author>>(
      'http://localhost:5278/api/Authors?PageIndex=0&PageSize=100'
    );
}

getById(id:number):Observable<Response<Author>>{
  return this.httpClient.get<Response<Author>>('http://localhost:5278/api/Authors/'+id);
}
add(author:Author):Observable<any>{
  const token = localStorage.getItem('Token'); 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.post<any>(this.apiUrl,author,{headers:headers})
}
editAuthor(author:Author):Observable<any>{
  const token = localStorage.getItem('Token'); 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.put<any>(this.apiUrl,author,{headers:headers})
}

deleteAuthor(authorId:number){
  return this.httpClient.delete('http://localhost:5278/api/Authors/'+authorId);
}

}

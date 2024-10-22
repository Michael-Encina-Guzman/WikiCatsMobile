import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private apiUrl = 'https://api.thecatapi.com/v1/images/search';

  constructor(private http: HttpClient) {}

  getCatImages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

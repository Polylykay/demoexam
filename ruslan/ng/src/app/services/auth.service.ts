import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRDTO } from '../classes/user';
import { of, tap } from 'rxjs';
import { AuthRDTO } from '../classes/AuthRDTO';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  register(item: RegisterRDTO) {
    console.log(item);
    return of(item)
  }
  login(item: AuthRDTO) {
    return  this.http.post(`${environment.apiUrl}/login`, item).pipe(tap((res) => console.log(res)))
  }
}

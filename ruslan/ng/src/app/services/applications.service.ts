import { Injectable } from '@angular/core';
import { ApplicationRDTO } from '../classes/application';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  

  createApplication(item: ApplicationRDTO) {
    return  this.http.post(`${environment.apiUrl}/application`, item)
  }
}

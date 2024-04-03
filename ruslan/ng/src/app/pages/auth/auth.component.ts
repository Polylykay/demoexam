import { Component } from '@angular/core';
import { InputComponent } from "../../components/input/input.component";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PageComponent } from '../../components/page/page.component';
import { AuthRDTO } from '../../classes/AuthRDTO';

@Component({
    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    imports: [InputComponent]
})
export class AuthComponent extends PageComponent<AuthRDTO> {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super();
    this.item = new AuthRDTO()
  }
  login() {
    if (!this.item.password || !this.item.email) {
      return alert('Form not full')
    }
    this.authService.login(this.item).subscribe({
      next: () => this.onLoginSuccess(),
      error: (err) => console.log(err)
    })
  }
  onLoginSuccess() {
    this.router.navigate(['my-applications'])
  }

}

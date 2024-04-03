import { Component } from '@angular/core';
import { PageComponent } from '../../components/page/page.component';
import { RegisterRDTO } from '../../classes/user';
import { InputComponent } from '../../components/input/input.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends PageComponent<RegisterRDTO> {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super();
    this.item = new RegisterRDTO()
  }
  register() {
    if (!this.item.email ||!this.item.phoneNumber ||!this.item.fio ||!this.item.password || !this.item.email) {
      return alert('Form not full')
    }
    this.authService.register(this.item).subscribe({
      next: () => this.onRegisterSuccess(),
      error: (err) => console.log(err)
    })
  }
  onRegisterSuccess() {
    this.router.navigate(['my-applications'])
  }
}

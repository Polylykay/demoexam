import { Component } from '@angular/core';
import { InputComponent } from "../../components/input/input.component";
import { PageComponent } from '../../components/page/page.component';
import { ApplicationDTO, ApplicationRDTO } from '../../classes/application';
import { ApplicationsService } from '../../services/applications.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-application',
    standalone: true,
    templateUrl: './create-application.component.html',
    styleUrl: './create-application.component.scss',
    imports: [InputComponent]
})
export class CreateApplicationComponent extends PageComponent<ApplicationDTO> {
    constructor(
        private applicationsService: ApplicationsService,
        private router: Router
    ) {
        super()
        this.item = new ApplicationDTO()
    }
    createApplication() {
        if (!this.item.bookingDate || !this.item.carId) {
          return alert('Заполните заявку полностью')
        }
        this.applicationsService.createApplication(new ApplicationRDTO( this.item)).subscribe({
            next: () => this.onCreateSuccess(),
            error: (err) => console.log(err)
        })
    }
    onCreateSuccess() {
        this.router.navigate(['my-applications'])
    }
}

import { Component } from '@angular/core';
import { ApplicationDTO } from '../../classes/application';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.scss'
})
export class MyApplicationsComponent {
  applications: ApplicationDTO[] = []
}

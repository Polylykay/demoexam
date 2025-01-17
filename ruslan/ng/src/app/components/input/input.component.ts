import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() type: 'text' | 'tel' | 'email' | 'password' = 'text';
  @Input() value: string|null = '';
  @Input() placeholder: string = '';
  @Output() valueChange = new EventEmitter<string>();

}

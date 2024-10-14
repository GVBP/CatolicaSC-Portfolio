
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-modal-load',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalAnimations {


}

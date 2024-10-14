import { Component } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    
    SidebarComponent
  ],
  templateUrl: './categorias.component.html',
  styleUrls: ['categorias.component.css']
})
export class CategoriasComponent {

}

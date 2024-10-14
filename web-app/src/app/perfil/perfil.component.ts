import { Component } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,

    SidebarComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['perfil.component.css']
})
export class PerfilComponent {

}

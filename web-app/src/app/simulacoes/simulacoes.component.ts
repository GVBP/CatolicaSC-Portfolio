import { Component } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-simulacoes',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    
    SidebarComponent
  ],
  templateUrl: './simulacoes.component.html',
  styleUrls: ['simulacoes.component.css']
})
export class SimulacoesComponent {

}

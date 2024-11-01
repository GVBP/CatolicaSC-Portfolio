import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';

import { DialogFormComponent } from '../components/dialog-form/dialog-form.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Aqui você pode chamar o serviço para salvar os dados
      console.log(result);
    });
  }
}

import { Component, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';

import { SidebarComponent } from '../sidebar/sidebar.component';

export interface Transaction {
  id: string;
  situacao: string;
  data: string;
  descricao: string;
  categoria: string;
  valor: string;
}

const CATEGORY: string[] = [
  'Despesa',
  'Receita'
];

@Component({
  selector: 'app-transacoes',
  styleUrls: ['./transacoes.component.css'],
  templateUrl: './transacoes.component.html',
  standalone: true,
  imports: [
    CommonModule,

    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,

    SidebarComponent,
  ]
})
export class TransacoesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'situacao', 'data', 'descricao', 'categoria', 'valor', 'acoes'];
  dataSource: MatTableDataSource<Transaction>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Valor selecionado, que aparecerá no botão
  selectedOption: string | null = 'transacoes';

  // Emitir o valor da opção selecionada
  @Output() selectionChange = new EventEmitter<string>();

  // Função chamada ao selecionar uma opção no dropdown
  onSelectionChange(option: string): void {
    this.selectionChange.emit(option);  // Emitir a opção selecionada

    if (option === 'receitas') {
      this.dataSource.filter = 'RECEITA';
    } else if (option === 'despesas') {
      this.dataSource.filter = 'DESPESA';
    } else {
      this.dataSource.filter = '';
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): Transaction {
  return {
    id: id.toString(),
    situacao: 'Pago',
    data: '01/09/2024',
    descricao: 'Descrição',
    categoria: CATEGORY[Math.round(Math.random() * (CATEGORY.length - 1))],
    valor: '5,00'
  };
}
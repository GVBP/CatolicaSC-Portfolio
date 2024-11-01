import { Component, Output, EventEmitter, AfterViewInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
//Sidebar
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
//Datepicker
import { DatepickerViewsSelectionComponent } from '../components/datepicker-views-selection/datepicker-views-selection.component';
import * as _moment from 'moment';
import { Moment } from 'moment';
//Select
import { MatSelectModule } from '@angular/material/select';
//Filter
import { MatInputModule } from '@angular/material/input';
//Table
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Transaction } from '../interface/transaction';
import { TransactionService } from '../services/transaction.service';
//Cards
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-transacoes',
  styleUrls: ['./transacoes.component.css'],
  templateUrl: './transacoes.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    //Sidebar
    MatSidenavModule,
    SidebarComponent,
    //Datepicker
    DatepickerViewsSelectionComponent,
    //Select
    MatSelectModule,
    //Filter
    MatInputModule,
    //Table
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    //Cards
    MatCardModule
  ]
})
export class TransacoesComponent implements AfterViewInit {
  //Select
  @Output() selectionChange = new EventEmitter<string>();
  //Table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Datepicker
  selectedDate: Moment | undefined;
  //Select
  selectedOption: string | null = 'transacoes';
  //Table
  displayedColumns: string[] = ['id', 'situacao', 'data', 'descricao', 'categoria', 'valor', 'acoes'];
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();
  transactionService: TransactionService = inject(TransactionService);

  constructor() {
    this.transactionService.getTransactions().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Datepicker
  onDateChanged(date: Moment) {
    this.selectedDate = date;
    // Atualiza o filtro de transações aqui
    console.log('Data selecionada:', this.selectedDate.format('MM/YYYY'));
  }

  //Select
  onSelectionChange(option: string): void {
    // Emitir a opção selecionada
    this.selectionChange.emit(option);

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

  //Table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

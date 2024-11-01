import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: 'dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css']
})
export class DialogFormComponent {
  valor = 'R$ 0,00';
  data = '01/01/2024';
  descricao = '';
  categoria = 'Receita';
  foiPaga = false;

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogFormComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      categoria: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      data: ['', [Validators.required, Validators.pattern('^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/[0-9]{4}$')]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      // Aqui você pode chamar o serviço para salvar os dados
      console.log(this.form.value);
      this.dialogRef.close(this.form.value);
    }
  }

  togglePago(): void {
    this.foiPaga = !this.foiPaga;
  }

  salvar(): void {
    console.log("Salvando a receita...");
  }

  salvarECriarNova(): void {
    console.log("Salvando e criando nova receita...");
    this.resetarCampos();
  }

  resetarCampos(): void {
    this.valor = 'R$ 0,00';
    this.data = '01/01/2024';
    this.descricao = '';
    this.categoria = 'Receita';
    this.foiPaga = false;
  }
}

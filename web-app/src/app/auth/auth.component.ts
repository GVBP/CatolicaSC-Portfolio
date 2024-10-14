import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ModalAnimations } from 'src/app/components/modalLoad/modal-animations';
//import { AuthService } from './auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//import { User } from './interface/user';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [ReactiveFormsModule]
})
export class AuthComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private readonly unsubscribe$ = new Subject<void>();
  isSignUpActive = true;

  constructor(
    private readonly fb: FormBuilder,
    public router: Router,
    public dialog: MatDialog,
    //private readonly auth: AuthService,
    public snackBar: MatSnackBar,
  ) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    this.loginForm.get('login')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => this.loginForm.patchValue({ login: value }));

    this.loginForm.get('password')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => this.loginForm.patchValue({ password: value }));
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      const dialogRef = this.dialog.open(ModalAnimations);

      /*this.auth.login(credentials).subscribe(
        (user: User) => {
          this.snackBar.open(`Login realizado com sucesso. Bem-vindo, ${user.userName}!`, 'OK', { duration: 2000 });
          dialogRef.close('success');

          setTimeout(() => {
            this.router.navigateByUrl('/dashboard');
          }, 2000);
        },
        err => {
          this.snackBar.open(err.error.errors[0], 'OK', { duration: 5000 });
          dialogRef.close('error');
        }
      );*/
    }
  }

  toggleSignUp(): void {
    this.isSignUpActive = true;
  }

  toggleSignIn(): void {
    this.isSignUpActive = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  preventDefault(event: Event): void {
    event.preventDefault();
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { of, throwError } from 'rxjs';
import { User } from './interface/user';

class MockAuthService {
    login(credentials: User) {
        return of({ token: 'mock-token', message: 'Success', userName: 'John' });
    }
    register() {
        return of({});
    }
}

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    let mockAuthService: MockAuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [AuthComponent],
            providers: [
                { provide: AuthService, useClass: MockAuthService },
                { provide: MatDialog, useValue: { open: () => ({ close: () => {} }) } },
                { provide: MatSnackBar, useValue: { open: () => {} } },
                { provide: Router, useValue: { navigateByUrl: () => {} } },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        mockAuthService = TestBed.inject(AuthService);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form', () => {
        expect(component.loginForm).toBeTruthy();
        expect(component.loginForm.controls['login'].value).toBe('');
        expect(component.loginForm.controls['password'].value).toBe('');
    });

    it('should call login method and navigate on successful login', () => {
        spyOn(mockAuthService, 'login').and.callThrough();
        spyOn(component.router, 'navigateByUrl');
        component.loginForm.setValue({ login: 'test@example.com', password: 'password' });
        component.onSubmit();

        expect(mockAuthService.login).toHaveBeenCalled();
        expect(component.router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
    });

    it('should show an error message on failed login', () => {
        spyOn(mockAuthService, 'login').and.returnValue(throwError({ error: { errors: ['Invalid credentials'] } }));
        spyOn(component.snackBar, 'open');
        component.loginForm.setValue({ login: 'test@example.com', password: 'wrongpassword' });
        component.onSubmit();

        expect(component.snackBar.open).toHaveBeenCalledWith('Invalid credentials', 'OK', { duration: 5000 });
    });

    it('should toggle between sign up and sign in', () => {
        expect(component.isSignUpActive).toBeTrue();
        component.toggleSignIn();
        expect(component.isSignUpActive).toBeFalse();
        component.toggleSignUp();
        expect(component.isSignUpActive).toBeTrue();
    });
});

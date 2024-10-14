import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './interface/user';

export interface Credentials {
    login: string;
    email?: string;
    password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly apiUrl = 'http://localhost:4200';

    constructor(private readonly http: HttpClient) { }

    login(credentials: Credentials): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/login`, credentials, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .pipe(catchError(this.handleError<User>('login')));
    }

    register(credentials: Credentials): Observable<unknown> {
        return this.http.post(`${this.apiUrl}/register`, credentials, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .pipe(catchError(this.handleError<unknown>('register')));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}

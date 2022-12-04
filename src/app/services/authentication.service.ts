import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/user';
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(username: string, password: string){
    return this.http.post<any>(`${environment.api}`, { username, password })
      .pipe(map(user => {
        // Almacena los detalles del usuario y el token JWT para mantener
        // al usuario logeado incluso entre actualizaciones de las páginas
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
  //      return user;
      }));
  }
  logout() {
    // Elimina al usuario del localStorage para cerrar sesión
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
  }
}

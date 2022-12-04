import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Person } from '@app/person';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  url = environment.apipeople;
  //  private person$ : new BehaviorSubject<Person>(initPerson);

  constructor(private service: HttpClient) { }

  // get SelectedPerson$: Observable<Person>{
  //   return this.person$.asObservable();
  // }

  // setPerson (person: Person): void{
  //   this.person$.next(person)
  // }

  getAll(): Observable<Person[]> {
    return this.service.get<Person[]>(this.url);
  }

  removePerson(id: number): Observable<Person> {
    return this.service.delete<Person>(`${this.url}/${id}`);
  }

  getById(id: number): Observable<Person> {
    return this.service.get<Person>(`${this.url}/${id}`);
  }
  updatePerson(person: Person): Observable<Person> {
    return this.service.patch<Person>(`${this.url}/${person.id}`, person);
  }

  addPerson(person: Person): Observable<Person> {
    return this.service.post<Person>(this.url, person);
  }
}


import { Person } from '@app/person';
import { PeopleService } from '@app/services/people.service';

import { Component, ViewChild,  ChangeDetectorRef, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { mergeWith, Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],

})

export class PeopleComponent implements OnInit  {


  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];


  dataSource = new ExampleDataSource(this.peopleService);

  @ViewChild(MatTable) table!: MatTable<Person>;


  constructor(private peopleService: PeopleService, 
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit(): void {

  }

  refresh() {
 
      this.dataSource = new ExampleDataSource(this.peopleService);
      this.changeDetectorRefs.detectChanges();
      this.table.renderRows();
    };
  
  remove(element: any) {


    if (confirm('Desea eliminar la persona?')) {
       this.peopleService.removePerson(element.id).subscribe();
       this.table.removeRowDef(element);
       this.refresh();

       this.router.navigate(['people']);
 
    }

  }
}



class ExampleDataSource extends DataSource<Person> {
  private _dataStream = new ReplaySubject<Person[]>();

  constructor(private peopleService: PeopleService) {
    super();

  }

  connect(): Observable<Person[]> {
    console.log("connect");
    return this.peopleService.getAll();
  }

  disconnect() { }

}
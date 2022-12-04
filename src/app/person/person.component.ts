import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '@app/person';
import { PeopleService } from '@app/services/people.service';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';


@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person!: Person;
  newperson=  {  id: 0,   name: '',    email: '',    phone: ''};

  title!: String;
  personForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: PeopleService) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }

  ngOnInit(): void {

    if (this.route.snapshot.params['Id']>1 ){
      this.title = 'Modificación de Personas';
      this.service.getById(+this.route.snapshot.params['Id']).subscribe((person: Person) => this.person = person);
    } else {
      this.person = this.newperson;
      this.title = 'Creación de Persona';
   
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.personForm.controls; }

  getErrorMessage() {
    if (this.f["name"].hasError('required') && this.f["name"].dirty && this.f["name"].touched) {
      return 'Nombre incorrecto.';
    }
    if (this.f["email"].hasError('required') && this.f["email"].dirty && this.f["email"].touched) {
      return 'Email incorrecto';
    }
    if (this.f["phone"].hasError('required') && this.f["phone"].dirty && this.f["phone"].touched) {
      return 'Teléfono incorrecto';
    }

    return ''

  }

  onSubmit() {

    // stop here if form is invalid
    if (this.personForm.invalid) {
      return;
    }

    if (this.person.id > 0) {
      this.service.updatePerson(this.person).subscribe();

    } else {

      this.service.addPerson(this.person).subscribe();
    }
    this.router.navigate(['/people']);

  }
  cancel() {

    this.router.navigate(['/people']);
  }
}
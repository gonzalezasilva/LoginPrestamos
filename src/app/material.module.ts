import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatTable } from '@angular/material/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule
  ],
  exports: [
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule,
    MatTable
  ]
})
export class MaterialModule { }

// Nuevo componente: filter-form.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule
  ],
  templateUrl: "./filter-form.component.html" ,
  styleUrls: ["./filter-form.component.css"]
})
export class FilterFormComponent {
  @Input() filterForm!: FormGroup;
  @Output() onSearch = new EventEmitter<void>();
  @Output() onClear = new EventEmitter<void>();
}

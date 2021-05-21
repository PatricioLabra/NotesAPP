import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.scss']
})
export class FormNoteComponent {

  formNote: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.formNote = this._fb.group({
      title: [''],
      state: [''],
      description: ['']
    });
  }

  onSubmit() {
    // TODO: Validate data maybe, parse state (string to State)
    console.log(this.formNote.getRawValue());
  }
}

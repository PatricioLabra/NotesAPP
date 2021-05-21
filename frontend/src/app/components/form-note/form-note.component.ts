import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Note } from '@models/note';

@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.scss']
})
export class FormNoteComponent implements OnInit {

  formNote: FormGroup;

  @Input()
  title: string = '';

  @Input()
  state: string = '';

  @Input()
  description: string = '';

  @Input()
  id: number = 0;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.formNote = this._fb.group({
      title: [this.title, Validators.required],
      state: [this.state, Validators.required],
      description: [this.description, Validators.required]
    });
  }

  onSubmit() {
    // TODO: Validate data maybe, parse state (string to State)

    const note: Note = {...this.formNote.getRawValue(), 'id': this.id};
    console.log(note);
  }
}

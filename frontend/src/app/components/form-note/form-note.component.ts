import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    console.log(this.formNote.getRawValue());
  }
}

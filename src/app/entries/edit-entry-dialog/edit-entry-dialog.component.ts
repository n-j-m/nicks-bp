import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

function bpTypeValidator(c: AbstractControl) {
  const result = c.value === 'morning' || c.value === 'evening';
  return result ? null : { invalidType: c.value };
}

@Component({
  selector: 'app-edit-entry-dialog',
  templateUrl: './edit-entry-dialog.component.html',
  styleUrls: ['./edit-entry-dialog.component.css'],
})
export class EditEntryDialogComponent implements OnInit {
  entryForm = this._fb.group({
    uid: [''],
    type: ['morning', bpTypeValidator],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    systolic: [0, [Validators.required, Validators.min(1)]],
    diastolic: [0, [Validators.required, Validators.min(1)]],
    pulse: [0, [Validators.required, Validators.min(1)]],
  });

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {}

  get type() {
    return this.entryForm.get('type');
  }
  get date() {
    return this.entryForm.get('date');
  }
  get time() {
    return this.entryForm.get('time');
  }
  get systolic() {
    return this.entryForm.get('systolic');
  }
  get diastolic() {
    return this.entryForm.get('diastolic');
  }
  get pulse() {
    return this.entryForm.get('pulse');
  }
}

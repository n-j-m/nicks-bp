import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { BPEntry } from '../models/bp-entry';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as dayjs from 'dayjs';

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

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<EditEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BPEntry,
  ) {
    console.log('data:', data);
    const date = dayjs(data.time).toISOString();
    const time = dayjs(data.time).format('hh:mm:ss');
    this.entryForm.setValue({ ...data, date, time });
  }

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

  saveEntry() {
    console.log('entry:', this.entryForm.value);
    const { uid, type, date, time, systolic, diastolic, pulse } = this.entryForm.value;
    const newEntry: BPEntry = {
      uid,
      type,
      systolic,
      diastolic,
      pulse,
      time: dayjs(`${dayjs(date).format('YYYY-MM-DD')} ${time}`)
        .toDate()
        .getTime(),
    };
    this.dialogRef.close(newEntry);
  }
}
